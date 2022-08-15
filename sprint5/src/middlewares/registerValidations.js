const User = require('../models/User')
const { body } = require('express-validator')

module.exports = [
    body('username')
        .notEmpty().withMessage('Ingrese un usuario').bail()
        .custom((value, { req }) => {
            let data = {...req.body}
            if(User.findByUsername(data.username)){
                throw new Error('Usuario no disponible');
            }
            return true
        }),

    body( 'email' )
        .notEmpty().withMessage('Ingrese un email').bail()
        .isEmail().withMessage('Email invalido').bail()
        .custom((value, { req }) => {
            let data = {...req.body}
            if( User.findByEmail(data.email) ){
                throw new Error('Email no disponible');
            }
            return true
        }),

    body( 'password' )
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength( { min: 8 } ).withMessage('Constraseña debe tener minimo 8 caracteres').bail()
        .custom((value, { req }) => {
            let password = req.body.password
            let repeatedPassword = req.body.rePassword

            if( password !== repeatedPassword ) {
                throw new Error('Las contraseñas ingresadas no coinciden');
            }
            return true
        })
]
