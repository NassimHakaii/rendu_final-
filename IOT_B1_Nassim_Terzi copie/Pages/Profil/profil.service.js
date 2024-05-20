/**
 * Service pour la gestion du profil utilisateur, permet les appels à l'API pour les fonctionnalités de profil
 */
document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawButton');
    const cardsContainer = document.getElementById('cardsContainer');
    const token = localStorage.getItem('token');

    // Fonction pour démarrer le minuteur de tirage de cartes si nécessaire
    const startTimer = (duration) => {
        const timerContainer = document.createElement('div');
        timerContainer.id = 'timer';
        cardsContainer.appendChild(timerContainer);

        let timeRemaining = duration;
        const interval = setInterval(() => {
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            timerContainer.innerHTML = `Temps restant: ${hours}h ${minutes}m ${seconds}s`;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                timerContainer.innerHTML = "Vous pouvez maintenant tirer vos cartes!";
                drawButton.disabled = false;
                drawButton.classList.remove('disabled');
            }

            timeRemaining -= 1000;
        }, 1000);
    };

    // Gestionnaire d'événements pour le bouton de tirage
    drawButton.addEventListener('click', async () => {
        console.log('Token:', token);
        try {
            const response = await fetch('http://localhost:3000/draw-cards', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Réponse:', data);
            if (response.ok && !data.message) {
                // Afficher les cartes tirées et l'image de la carte
                cardsContainer.innerHTML = '';
                data.forEach(card => {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.innerHTML = `
                        <img class="card_image
                        " src="https://hp-api.lainocs.fr/images/${card.image}" alt="${card.name}" />
                        <div class="card_info">
                            <h3>${card.name}</h3>
                            <p>Maison: ${card.house}</p>
                            <p>Acteur: ${card.actor}</p>
                        </div>
                    `;
                    cardsContainer.appendChild(cardDiv);
                });
                fetchUserCards().then(cards => {
                    displayCards(cards);
                });
            } else {
                // Afficher un message d'erreur
                cardsContainer.innerHTML = `<div>${data.message}</div>`;
                if (data.timeRemaining) {
                    const [hours, minutes] = data.timeRemaining.split(' ').map(part => parseInt(part));
                    const timeRemainingInMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
                    startTimer(timeRemainingInMs);
                    drawButton.disabled = true;
                    drawButton.classList.add('disabled');
                }
                if(data.message === 'Token manquant'){
                    window.location.href = '/Pages/Login/login.html';
                }
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            cardsContainer.innerHTML = `<p>Erreur lors de la requête</p>`;
        }
    });

    const cardsContainerGallery = document.querySelector('.cards_container_gallery');
    const filterButtons = document.querySelectorAll('.filter-button button');

    // Fonction pour récupérer les cartes de l'utilisateur
    const fetchUserCards = async () => {
        try {
            const response = await fetch('http://localhost:3000/getMyCards', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des cartes');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            return [];
        }
    };

    // Fonction pour afficher les cartes
     const displayCards = (cards) => {
        cardsContainerGallery.innerHTML = '';
        cards.forEach(userCard => {
            const card = userCard.card;
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card card_gallery';
            cardDiv.dataset.house = card.house;
            cardDiv.innerHTML = `
                <img class="card_image" src="https://hp-api.lainocs.fr/images/${card.image}" alt="${card.name}" />
                <div class="card_info">
                    <h3>${card.name}</h3>
                    <p>Maison: ${card.house}</p>
                    <p>Rareté: ${card.rarity}</p>
                    <p>Quantité: ${userCard.quantity}</p>
                    <p>Description: ${card.description}</p>
                    <p>Acteur: ${card.actor}</p>
                    <p>Power: ${card.power}</p>
                </div>
            `;
            cardsContainerGallery.appendChild(cardDiv);
        });
    };

    // Fonction pour filtrer les cartes par maison
    const filterCards = (house) => {
        const cards = document.querySelectorAll('.card_gallery');
        cards.forEach(card => {
            if (house === 'Tous' || card.dataset.house === house) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Ajouter des gestionnaires d'événements pour les boutons de filtrage
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('select'));
            event.target.classList.add('select');
            const house = event.target.getAttribute('data-house');
            filterCards(house);
        });
    });

    // Récupérer et afficher les cartes de l'utilisateur au chargement de la page
    fetchUserCards().then(cards => {
        displayCards(cards);
    });

    // Logout
    const logouta = document.getElementById('logout');
    logouta.addEventListener('click', async () => {
        localStorage.removeItem('token');
        window.location.href = '../Login/login.html';
    });
});
