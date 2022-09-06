const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//MULTER - RESTRICCIONES - VALIDACIONES
const uploadImg = require('../middlewares/multerUser')

const registerValidations = require('../middlewares/registerValidations')
const loginValidations = require('../middlewares/loginValidations')
const editUserValidations = require('../middlewares/editUserValidations')

const isGuestMdw = require('../middlewares/isGuestMdw')
const isUserMdw = require('../middlewares/isUserMdw')
const isAdminMdw = require('../middlewares/isAdminMdw')

//LISTADO DE USUARIOS
router.get('/', /*isAdminMdw,*/ userController.index)

//REGISTRO DE USUARIO
router.get('/register', isUserMdw, userController.register);
router.post('/register', registerValidations, userController.add);

//LOGIN DE USUARIO
router.get('/login', isUserMdw, userController.login);
router.post('/login', loginValidations, userController.loginPost);

//EDICION DE INFO USUARIO
router.get('/edit/:id', isGuestMdw, userController.edit);
router.put('/edit/:id', isGuestMdw, uploadImg.single('image'), editUserValidations, userController.update);

//PERFIL DE USUARIO
router.get('/:id', isGuestMdw, userController.profile);

//DESLOGUEA AL USUARIO
router.post('/logout', isGuestMdw, userController.logout);

//ELIMINA UN USUARIO
router.get('/delete/:id', isAdminMdw, userController.delete);

module.exports = router;