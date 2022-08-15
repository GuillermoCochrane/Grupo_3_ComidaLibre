//EXPRESS Y ROUTER
const express = require('express');
const router = express.Router();

//CONTROLADOR DE USUARIOS
const userController = require('../controllers/userController');

//MULTER Y CONFIGURACION
const uploadImg = require('../middlewares/multerUser')

//VALIDACIONES
const registerValidations = require('../middlewares/registerValidations')
const loginValidations = require('../middlewares/loginValidations')
const editUserValidations = require('../middlewares/editUserValidations')

//RESTRICCION DE ACCESO A RUTAS
const isGuestMdw = require('../middlewares/isGuestMdw')
const isUserMdw = require('../middlewares/isUserMdw')
const isAdminMdw = require('../middlewares/isAdminMdw')

//LISTADO DE USUARIOS
router.get('/', isAdminMdw, userController.index)

//FORMULARIO DE REGISTRO
router.get('/register', isUserMdw, userController.register);
router.post('/register', registerValidations, userController.add);

//FORMULARIO DE LOGIN
router.get('/login', isUserMdw, userController.login);
router.post('/login', loginValidations, userController.loginPost);

//FORMULARIO DE EDICION DE USUARIO
router.get('/edit/:id', isGuestMdw, userController.edit);
router.put('/edit/:id', isGuestMdw, uploadImg.single('image'), editUserValidations, userController.update);

//PERFIL DE USUARIO
router.get('/:id', isGuestMdw, userController.profile);

//DESLOGUEA AL USUARIO
router.post('/logout', isGuestMdw, userController.logout);

//BORRADO DE USUARIO
router.post('/:id', isAdminMdw, userController.delete);

module.exports = router;