const db = require("../database/models");
const { body } = require("express-validator");

module.exports = [
  body("username")
    .notEmpty().withMessage("Ingrese un usuario")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      return db.User.findOne({ where: { username: data.username } })
      .then(user => {
        if (user) {
          return Promise.reject("Usuario no disponible");
        }
      });
  }),

  body("email")
    .notEmpty().withMessage("Ingrese un email")
    .bail()
    .isEmail().withMessage("Email invalido")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      return db.User.findOne({ where: { email: data.email } })
      .then(user => {
        if (user) {
          return Promise.reject("Email no disponible");
        }
      });
  }),

  body("password")
    .notEmpty().withMessage("Ingrese una contraseña")
    .bail()
    .isLength({ min: 8 }).withMessage("Constraseña debe tener minimo 8 caracteres")
    .bail()
    .custom((value, { req }) => {
      let password = req.body.password;
      let repeatedPassword = req.body.rePassword;
      if (password !== repeatedPassword) {
        throw new Error("Las contraseñas ingresadas no coinciden");
      }
      return true;
  }),
];
