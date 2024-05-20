const { hash } = require("bcrypt");
const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");


class UsersController {
  
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  // Fonction pour récupérer tous les utilisateurs de la base de données (GET /users)
  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  }

  // Fonction pour créer un utilisateur dans la base de données (POST /users)
  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  // Fonction pour récupérer un utilisateur par son ID (GET /users/:id)
  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.find((user) => user.id === parseInt(id));

      if (user === undefined) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send(user);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        status: "Error",
        message: "Internal server error",
      });
    }
  }

  // Fonction pour mettre à jour un utilisateur par son ID (PUT /users/:id)
  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (user === undefined) {
        return res.status(404).send(" ID not found.");
      }

      await prisma.user.update({
        where: { id },
        data: body,
      });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  }

  // Fonction pour supprimer un utilisateur par son ID (DELETE /users/:id)
  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      await prisma.user.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new UsersController();
