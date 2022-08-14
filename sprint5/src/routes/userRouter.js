const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const bcryptjs = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({  
    destination: (req, file, cb) => {
        let imgAdress = path.join(__dirname,'../../public/images/avatars');
        cb(null, imgAdress);
    },
    filename: (req, file, cb) => {
        let newName = `${Date.now()}_userImage${path.extname(file.originalname)}`;
        cb(null, newName);
    }
})
const upload = multer({ storage });

const loginValidation = [
    body('username')
        .notEmpty().withMessage('El campo Usuario es obligatorio').bail()
        .isLength({min:4}).withMessage('El nombre de usuario debe tener al menos 4 caracteres'),
    body('password')
        .notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
        
]

const userController = require('../controllers/userController');

router.get('/', userController.profile);

router.get('/login', userController.log);
router.post('/login', userController.validate);

router.get('/register', userController.reg);
router.post('/register', upload.single('image'), userController.create);

router.get('/edit/:id', userController.edit); 
router.put('/edit/:id',upload.single('image'), userController.update); 


module.exports = router;