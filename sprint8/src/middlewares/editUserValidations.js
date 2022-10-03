const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  body("username")
    .notEmpty().optional().withMessage("Ingrese un usuario")
    .bail()
    .isLength({min: 2}).optional().withMessage("Debe tener mínimo 2 caracteres")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      let userId = req.params.id;
      let findByName = db.User.findOne({
        where: { username: data.username },
        raw: true,
      });
      let findById = db.User.findOne({ 
        where: { id: userId }, 
        raw: true 
      });
      return Promise.all([findByName, findById])
      .then(([userByName, userById]) => {
        if (userByName && userById.username != userByName.username) {
          return Promise.reject("Usuario no disponible");
        }
      });
    }).optional(),
  body("password")
    .notEmpty().optional().withMessage("Ingrese una contraseña")
    .bail()
    .isLength({ min: 8 }).optional().withMessage("Contraseña debe tener mínimo 8 caracteres")
    .bail()
    .isStrongPassword().optional().withMessage("Contraseña debe tener mínimo: 8 caracteres, 1 mayúscula, 1 minúscula y 1 símbolo")
    .custom((value, { req }) => {
      let password = req.body.password;
      let repeatedPassword = req.body.rePassword;
      if (password) {
        if (password !== repeatedPassword) {
          throw new Error("Las contraseñas ingresadas no coinciden");
        }
      }
      return true;
    }).optional(),
  body("image")
    .custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = [".jpg", ".jpeg", ".gif", ".png"];
      if (file) {
        if (acceptedExtensions.includes(path.extname(file.originalname)) === false) {
          throw new Error(`Formatos válidos: ${acceptedExtensions.join(", ")}`);
        }
      }
      return true;
    }),
  body("email")
    .notEmpty().optional().withMessage("Ingrese un email")
    .bail()
    .isEmail().optional().withMessage("Email inválido")
    .bail()
    .custom((value, { req }) => {
      let data = { ...req.body };
      let userId = req.params.id;
      let findByEmail = db.User.findOne({
        attributes: { exclude: ['password'] },
        where: { email: data.email },
        raw: true,
      });
      let findById = db.User.findOne({ 
        attributes: { exclude: ['password'] },
        where: { id: userId }, 
        raw: true 
      });
      return Promise.all([findByEmail, findById])
      .then(([userByEmail, userById]) => {
        if (userByEmail && userById.username != userByEmail.username) {
          return Promise.reject("Email no disponible");
        }
      });
    }).optional(),
  body("phone")
    .isMobilePhone().optional()
    .withMessage(`Ingrese un número de teléfono válido (sin espacios ni guiones) ej: +5493888997717`)
    .bail(),
];
