const User = require('../models/User')
const { body } = require('express-validator')
const bcryptjs = require('bcryptjs');

module.exports = [
    body( 'emailUser' )
        .notEmpty().withMessage('El campo Usuario/Email es obligatorio').bail()
        .custom((value, { req }) => {
            let data = { ...req.body }
            let userByEmail = User.findByEmail(data.emailUser);
            let userByName = User.findByUsername(data.emailUser);

            if( !userByEmail ){
                if( !userByName ) {
                    throw new Error('Credenciales invalidas');
                }
            }
            return true
        }),

    body( 'password' )
        .notEmpty().withMessage('Ingrese su contraseña').bail()
        .isLength( { min: 8 } ).withMessage('Constraseña debe tener minimo 8 caracteres').bail()
        .custom( (value, { req }) => {
            let data = { ...req.body }
            let userByEmail = User.findByEmail(data.emailUser);
            let userByName = User.findByUsername(data.emailUser);

            if( userByEmail ){
                if( bcryptjs.compareSync(data.password, userByEmail.password) === false ){
                    throw new Error('Credenciales invalidas');
                }
            } else if ( userByName ) {
                if( bcryptjs.compareSync(data.password, userByName.password) === false ){
                    throw new Error('Credenciales invalidas');
                }
            }
            return true
        })
]