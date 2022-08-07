const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const bcryptjs = require('bcryptjs');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({  
        destination: function (req, file, cb) {
            let imgAdress = path.join(__dirname,'../../public/images/avatar') ;
            cb(null, imgAdress);
        },
        filename: function (req, file, cb) {
            let newName = "img-user" + Date.now() + path.extname(file.originalname);
            cb(null, newName );
        },
})

var upload= multer({storage: storage});

const loginValidation = [
    body('username')
        .notEmpty().withMessage('El campo Usuario es obligatorio').bail()
        .isLength({min:4}).withMessage('El nombre de usuario debe tener al menos 4 caracteres'),
    body('password')
        .notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
        
]

const userController = require('../controllers/userController');

router.get('/:id', userController.profile);

router.get('/login', userController.log);
router.post('/login', userController.validate);

router.get('/register', userController.reg);
router.post('/register', userController.create);

router.get('/edit/:id', userController.edit); 
router.put('/edit/:id',upload.single('image'), userController.update); 


module.exports = router;