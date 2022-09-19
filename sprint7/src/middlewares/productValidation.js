const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");
module.exports = [
  body("name")
    .notEmpty().withMessage("Ingresa un nombre")
    .isLength({ min: 5 }).withMessage("nombre debe tener minimo 5 caracteres")
    .custom((value, { req }) => {
      let data = { ...req.body };
      return db.Product.findOne({ where: { name: data.name } })
      .then(product => {
        if (product) {
          return Promise.reject("Nombre no disponible");
        }
      });
  }),
  body("price")
    .notEmpty().withMessage("Ingresa un valor")
    .isNumeric().withMessage("Ingresa un valor numerico"),
  body("idCat")
    .notEmpty().withMessage("Selecciona una opcion")
    .isInt({gt: 1, lt: 4}).withMessage("Ingresa un numero entero entre 1 y 4"),
  body("status")
    .notEmpty().withMessage("Selecciona una opcion")
    .isInt({gt: 1, lt: 4}).withMessage("Ingresa un numero entero entre 1 y 4"),
  body("discount")
    .isNumeric().withMessage("Ingresa un valor numerico")
    .isLength({ min: 0 }, { max: 100 }).withMessage("El valor debe ser de 0 a 100"),
  body("description")
    .isLength({ max: 500 }).withMessage("Maximo 500 caracteres"),
  body("img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".gif", ".png"];
    if (file) {
      if (acceptedExtensions.includes(path.extname(file.originalname)) === false) {
        throw new Error(`Formatos validos: ${acceptedExtensions.join(", ")}`);
      }
    }
    return true;
  }),
];
