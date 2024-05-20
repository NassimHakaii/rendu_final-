const prisma = require("../config/prisma");

/**
 * @class UserCardsController
 * @classdesc Controller for UserCards
 * Ce controlleur a pour but de faire tirer 5 cartes par jour aléatoirement à l'utilisateur (dépend aussi de la rareté des cartes colonne 'rarity' dans la table 'cards', en effet on a plus de chance de tirer une carte commune que rare (sachant que la coefficient de rareté est un float)) et de récupérer les cartes de l'utilisateur authentifié
 */
class UserCardsController {
    /**
     * @function draw
     * @async
     * @description Cette fonction permet de tirer 5 cartes aléatoirement par jour à l'utilisateur
     * @param {Object} req - Requête HTTP
     * @param {Object} res - Réponse HTTP
     * @returns {Object} - Retourne un objet contenant les cartes tirées
     */
    async draw(req, res) {
        try {
            const { user } = req;
            if (!user || !user.id) {
                console.error("Utilisateur non authentifié");
                return res.status(400).json({ message: "Utilisateur non authentifié" });
            }

            // Vérifier la dernière fois que l'utilisateur a tiré des cartes
            const lastDraw = await prisma.user.findUnique({
                where: { id: user.id },
                select: { lastDraw: true }
            });

            const now = new Date();
            // Si l'utilisateur a déjà tiré des cartes aujourd'hui, renvoyer un message d'erreur
            if (lastDraw && (now - new Date(lastDraw.lastDraw)) < 86400000) {
                const timeRemaining = 86400000 - (now - new Date(lastDraw.lastDraw));
                const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                return res.status(200).json({
                    message: "Vous ne pouvez piocher que toutes les 24 heures",
                    timeRemaining: `${hours}h ${minutes}m`
                });
            }

            // Utiliser la fonction drawCards pour tirer 5 cartes aléatoires pondérées
            const cards = await drawCards();
            console.log("Cartes tirées:", cards);

            // Enregistrer les cartes tirées pour cet utilisateur
            for (const card of cards) {
                const existingUserCard = await prisma.userCards.findFirst({
                    where: {
                        id_user: user.id,
                        id_card: card.id_card
                    }
                });

                if (existingUserCard) {
                    // Si la carte existe déjà pour l'utilisateur, augmentez la quantité
                    await prisma.userCards.update({
                        where: {
                            id: existingUserCard.id
                        },
                        data: {
                            quantity: { increment: 1 }
                        }
                    });
                } else {
                    // Sinon, ajoutez une nouvelle entrée pour cette carte
                    await prisma.userCards.create({
                        data: {
                            id_user: user.id,
                            id_card: card.id_card,
                            quantity: 1
                        }
                    });
                }
            }

            // Mettre à jour la dernière date de tirage de l'utilisateur
            await prisma.user.update({
                where: { id: user.id },
                data: { lastDraw: now }
            });
            
            return res.status(200).json(cards);
        } catch (e) {
            console.error("Error in draw method:", e);
            return res.status(500).json({ message: e.message });
        }
    }
    
    /**
     * @function getMyCards
     * @async
     * @description Cette fonction permet de récupérer les cartes de l'utilisateur authentifié
     * @param {*} req 
     * @param {*} res 
     * @returns {Object} - Retourne un objet contenant les cartes de l'utilisateur authentifié
    */
    async getMyCards(req, res) {
        try {
            const user = req.user;
            const userCards = await prisma.userCards.findMany({
                where: {
                    id_user: user.id
                },
                include: {
                    card: true
                }
            });
            console.log("Cartes de l'utilisateur:", userCards);
            return res.status(200).json(userCards);
        } catch (e) {
            console.error("Error in getMyCards method:", e);
            return res.status(500).json({ message: e.message });
        }
    }
}

// Fonction auxiliaire pour tirer les cartes
async function drawCards() {
    try {
        const cards = await prisma.card.findMany();
        if (!cards || cards.length === 0) {
            throw new Error("No cards available");
        }

        const weightedCards = [];

        // Créer un tableau pondéré en fonction de la rareté des cartes
        cards.forEach(card => {
            if (!card.rarity || typeof card.rarity !== "number" || card.rarity <= 0) {
                console.error("Invalid card rarity:", card);
                return;
            }
            const weight = Math.floor((1 / card.rarity) * 100); 
            for (let i = 0; i < weight; i++) {
                weightedCards.push(card);
            }
        });

        if (weightedCards.length < 5) {
            throw new Error("Insufficient cards for drawing");
        }

        // Mélanger le tableau pondéré
        for (let i = weightedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [weightedCards[i], weightedCards[j]] = [weightedCards[j], weightedCards[i]];
        }

        // Sélectionner 5 cartes aléatoires
        const selectedCards = weightedCards.slice(0, 5);
        console.log("Cartes sélectionnées pour tirage:", selectedCards);

        return selectedCards;
    } catch (error) {
        console.error("Error in drawCards function:", error);
        throw error;
    }
}

module.exports = UserCardsController;
