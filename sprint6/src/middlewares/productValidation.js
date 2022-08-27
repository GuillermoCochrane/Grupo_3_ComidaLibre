const { body } = require('express-validator')
const Product = require('../models/Product')
const path = require('path')

module.exports = [
    body('name')
        .notEmpty().withMessage( 'Ingresa un nombre' )
        .custom((value, { req }) => {
            let data = { ...req.body }
            if( Product.findByName(data.name) ){
                throw new Error('Nombre no disponible');
            }
            return true
        }),
    body('price')
        .notEmpty().withMessage( 'Ingresa un valor' )
        .isNumeric().withMessage( 'Ingresa un valor numerico' ),
    body('idCat')
        .notEmpty().withMessage( 'Selecciona una opcion' ),
    body('discountAmount')
        .isNumeric().withMessage( 'Ingresa un valor numerico' )
        .isLength({min: 0}, {max: 100}).withMessage( 'El valor debe ser de 0 a 100' ),
    body('description')
        .isLength( {max: 500} ).withMessage('Maximo 500 caracteres'),
    body( 'img' )
        .custom( (value, { req }) =>{
            let file = req.file
            let acceptedExtensions = ['.jpg', '.png'];

            if(file) {
                if( acceptedExtensions.includes( path.extname(file.originalname) ) === false ) {
                    throw new Error(`Formatos validos: ${acceptedExtensions.join(', ')}`);
                }
            }
            return true
        }),
        
]