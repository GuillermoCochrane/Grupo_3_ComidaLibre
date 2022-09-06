const path = require('path');
const { body } = require('express-validator')

module.exports = [
    body( 'password' )
        .custom((value, { req }) => {
            let password = req.body.password
            let repeatedPassword = req.body.rePassword

            if(password) {
                if( password.length < 8 ) {
                    throw new Error('Contraseña minimo de 8 caracteres');
                }
    
                if( password !== repeatedPassword ) {
                    throw new Error('Las contraseñas ingresadas no coinciden');
                }
            }
            return true
        }),

    body( 'image' )
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

    body( 'email' )
        .custom( (value, { req }) => {
            let email = req.body.email
            //solución temporal
            var email_re = /\S+@\S+\.\S+/;
            
            if (email){
                if ( email_re.test(email) === false ) {
                    throw new Error('Email invalido');
                }
            }
            return true
        }),
    
    body( 'phone' )
        .custom( (value, { req }) => {
            let phone = req.body.phone

            if(phone){
                //solución temporal
                if( isNaN(phone) === true ) {
                    throw new Error('Telefono debe ser numerico');
                }
            }
            return true
        })
]