const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");
module.exports = [
  body("name")
    .notEmpty().withMessage("Ingresa un nombre")
    .isLength({ min: 5 }).withMessage("Nombre debe tener mínimo 5 caracteres")
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
    .isNumeric().withMessage("Ingresa un valor numérico"),
  body("idCat")
    .notEmpty().withMessage("Selecciona una opción")
    .isInt({min: 1, max: 4}).withMessage("Ingresa un número entero entre 1 y 4"),
  body("status")
    .notEmpty().withMessage("Selecciona una opción")
    .isInt({min: 1, max: 4}).withMessage("Ingresa un número entero entre 1 y 4"),
  body("discount")
    .isNumeric().withMessage("Ingresa un valor numérico")
    .isLength({ min: 0 }, { max: 100 }).withMessage("El valor debe ser entre 0 y 100"),
  body("description")
    .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),
  body("img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".gif", ".png"];
    if (file) {
      if (acceptedExtensions.includes(path.extname(file.originalname)) === false) {
        throw new Error(`Formatos válidos: ${acceptedExtensions.join(", ")}`);
      }
    }
    return true;
  }),
];
