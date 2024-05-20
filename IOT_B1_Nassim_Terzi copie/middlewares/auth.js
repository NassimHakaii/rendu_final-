const prisma = require("../config/prisma");
const jsonwebtoken = require("jsonwebtoken");

/**
 * @class AuthMiddleware
 * @classdesc Middleware for authentication
 * Ce middleware a pour but de vérifier si l'utilisateur est authentifié
 * @exports AuthMiddleware
 */
class AuthMiddleware {
  async authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Récupérer le token de l'en-tête d'autorisation
    const token = authHeader && authHeader.split(" ")[1];
    // Vérifier si le token est présent
    if (token == null) return res.status(401).json({ message: "Token manquant" });
    // Vérifier si le token est valide
    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        console.log("Erreur de vérification du token:", err);
        return res.status(403).json({ message: "Token invalide" });
      }

      const email = payload.email;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return res.status(403).json({ message: "Utilisateur non trouvé" });

      req.user = user;
      console.log("Utilisateur", user)

      next();
    });
  }
}

module.exports = new AuthMiddleware();
