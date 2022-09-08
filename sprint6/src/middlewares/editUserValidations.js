const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  body("username")
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
        if (userByName && userById.name != userByName.name) {
          return Promise.reject("Usuario no disponible");
        }
      });
  }),
  body("password")
    .custom((value, { req }) => {
      let password = req.body.password;
      let repeatedPassword = req.body.rePassword;
      if (password) {
        if (password.length < 8) {
          throw new Error("Contraseña minimo de 8 caracteres");
        }
        if (password !== repeatedPassword) {
          throw new Error("Las contraseñas ingresadas no coinciden");
        }
      }
      return true;
  }),
  body("image")
    .custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = [".jpg", ".png"];
      if (file) {
        if (acceptedExtensions.includes(path.extname(file.originalname)) === false) {
          throw new Error(`Formatos validos: ${acceptedExtensions.join(", ")}`);
        }
      }
      return true;
  }),
  body("email")
    .custom((value, { req }) => {
      let data = { ...req.body };
      //solución temporal
      var email_re = /\S+@\S+\.\S+/;
      if (data.email) {
        if (email_re.test(data.email) === false) {
          throw new Error("Email invalido");
        }
      }
      let userId = req.params.id;
      let findByEmail = db.User.findOne({
        where: { email: data.email },
        raw: true,
      });
      let findById = db.User.findOne({ 
        where: { id: userId }, 
        raw: true 
      });
      return Promise.all([findByEmail, findById])
      .then(([userByEmail, userById]) => {
        if (userByEmail && userById.name != userByEmail.name) {
          return Promise.reject("Email no disponible");
        }
      });
  }),
  body("phone")
    .custom((value, { req }) => {
      let phone = req.body.phone;
      if (phone) {
        //solución temporal
        if (isNaN(phone) === true) {
          throw new Error("Telefono debe ser numerico");
        }
      }
      return true;
  }),
];
