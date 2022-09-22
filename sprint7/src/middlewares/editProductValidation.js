const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");
module.exports = [
  body("name")
    .notEmpty().optional().withMessage("Ingresa un nombre")
    .custom((value, { req }) => {
      let data = { ...req.body };
      let productId = req.params.idProduct;
      let findByName = db.Product.findOne({
        where: { name: data.name },
        raw: true,
      });
      let findById = db.Product.findOne({
        where: { id: productId },
        raw: true,
      });
      return Promise.all([findByName, findById])
      .then(([productByName, productById]) => {
        if (productByName && productById.name != productByName.name) {
          return Promise.reject("Nombre no disponible");
        }
      });
    }).optional(),
  body("price")
    .notEmpty().optional().withMessage("Ingresa un valor")
    .isNumeric().optional().withMessage("Ingresa un valor numérico"),
  body("idCat")
    .notEmpty().optional().withMessage("Selecciona una opción")
    .isInt({min: 1, max: 4}).optional().withMessage("Ingresa un número entero entre 1 y 4"),
  body("status")
    .notEmpty().optional().withMessage("Selecciona una opción")
    .isInt({min: 1, max: 4}).optional().withMessage("Ingresa un número entero entre 1 y 4"),
  body("discount")
    .isNumeric().optional().withMessage("Ingresa un valor numérico")
    .isLength({ min: 0 }, { max: 100 }).optional().withMessage("El valor debe ser de 0 a 100"),
  body("description")
    .isLength({ max: 500 }).optional().withMessage("Máximo 500 caracteres"),
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
