const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");
module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Ingresa un nombre")
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
      return Promise.all([findByName, findById]).then(
        ([productByName, productById]) => {
          if (productByName && productById.name != productByName.name) {
            return Promise.reject("Nombre no disponible");
          }
        }
      );
    }),
  body("price")
    .notEmpty()
    .withMessage("Ingresa un valor")
    .isNumeric()
    .withMessage("Ingresa un valor numerico"),
  body("idCat").notEmpty().withMessage("Selecciona una opcion"),
  body("status").notEmpty().withMessage("Selecciona una opcion"),
  body("discount")
    .isNumeric()
    .withMessage("Ingresa un valor numerico")
    .isLength({ min: 0 }, { max: 100 })
    .withMessage("El valor debe ser de 0 a 100"),
  body("description")
    .isLength({ max: 500 })
    .withMessage("Maximo 500 caracteres"),
  body("img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png"];

    if (file) {
      if (
        acceptedExtensions.includes(path.extname(file.originalname)) === false
      ) {
        throw new Error(`Formatos validos: ${acceptedExtensions.join(", ")}`);
      }
    }
    return true;
  }),
];
