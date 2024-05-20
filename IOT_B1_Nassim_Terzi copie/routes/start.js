const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const AuthentificationController = require("../Controllers/AuthentificationController");
const AuthMiddleware = require("../middlewares/auth");
const UserCardsController = require("../Controllers/UserCardsController");

const userCardsController = new UserCardsController();

router.get("/draw-cards", AuthMiddleware.authenticate, userCardsController.draw.bind(userCardsController));
router.get("/getMyCards", AuthMiddleware.authenticate, userCardsController.getMyCards.bind(userCardsController));

router.get("/users", UsersController.index);
router.post("/register", UsersController.store);
router.get("/users/:id", AuthMiddleware.authenticate, UsersController.show);
router.put("/users/:id", AuthMiddleware.authenticate,UsersController.update);
router.delete("/users/:id", AuthMiddleware.authenticate, UsersController.destroy);
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);

module.exports = router;
