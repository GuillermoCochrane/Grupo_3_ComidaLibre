const db = require("../database/models");
const { body } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = [
  body("emailUser")
    .notEmpty().withMessage("El campo Usuario/Email es obligatorio")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      return db.User.findOne({
        where: { email: data.emailUser },
        raw: true,
      }).then(user => {
        if (!user) {
          return db.User.findOne({
            where: { username: data.emailUser },
            raw: true,
          }).then(user => {
            if (!user) {
              return Promise.reject("Credenciales invalidas");
            }
          });
        }
      });
    }),
  body("password")
    .notEmpty().withMessage("Ingrese su contraseña")
    .bail()
    .isLength({ min: 8 }).withMessage("Constraseña debe tener minimo 8 caracteres")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      return db.User.findOne({
        where: { email: data.emailUser },
        raw: true,
      }).then(user => {
        if (!user) {
          return db.User.findOne({
            where: { username: data.emailUser },
            raw: true,
          }).then(user => {
            if (!user) {
              return Promise.reject("Credenciales invalidas");
            } else {
              if (bcryptjs.compareSync(data.password, user.password) === false) {
                return Promise.reject("Credenciales invalidas");
              }
            }
          });
        } else {
          if (bcryptjs.compareSync(data.password, user.password) === false) {
            return Promise.reject("Credenciales invalidas");
          }
        }
      });
    }),
];
