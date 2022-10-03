const db = require("../database/models");
const { body } = require("express-validator");

module.exports = [
  body("username")
    .notEmpty().withMessage("Ingrese un usuario")
    .bail()
    .isLength({min: 2}).withMessage("Debe tener mínimo 2 caracteres")
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
    .isEmail().withMessage("Email inválido")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      return db.User.findOne({ where: { email: data.email } })
      .then(user => {
        if (user) {
          return Promise.reject("Email ya está registrado");
        }
      });
  }),

  body("password")
    .notEmpty().withMessage("Ingresá una contraseña")
    .bail()
    .isLength({ min: 8 }).withMessage("Constraseña debe tener mínimo 8 caracteres")
    .bail()
    .isStrongPassword().withMessage("Contraseña debe tener mínimo: 8 caracteres, 1 mayúscula, 1 minúscula y 1 símbolo")
    .custom((value, { req }) => {
      let data = { ...req.body };
      let password = req.body.password;
      let repeatedPassword = req.body.rePassword;
      if (password !== repeatedPassword) {
        throw new Error("Las contraseñas ingresadas no coinciden");
      }
      return true;
  }),
];
