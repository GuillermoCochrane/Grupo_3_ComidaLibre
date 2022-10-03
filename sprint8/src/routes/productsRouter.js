const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

//MULTER - RESTRICCION ACCESO - VALIDACIONES
const uploadImg = require('../middlewares/multerProducts')
const isAdminMdw = require('../middlewares/isAdminMdw')
const productValidation = require('../middlewares/productValidation')
const editProductValidation = require('../middlewares/editProductValidation')

//LISTADO DE TODOS LOS PRODUCTOS
router.get('/', productsController.producto);
//FORMULARIOS CREACIÓN Y EDICIÓN
router.get('/create', isAdminMdw, productsController.create);
router.get('/edit/:idProduct', isAdminMdw, productsController.edit); 
//LISTADO POR CATEGORÍA
router.get('/:idCategory', productsController.category);
//DETALLE DE PRODUCTO
router.get('/:idCategory/:idProduct', productsController.detail);
//AGREGAR PRODUCTO
router.post('/store', isAdminMdw, uploadImg.single('img'), productValidation, productsController.store);
//EDITAR PRODUCTO
router.put('/update/:idCategory/:idProduct', isAdminMdw, uploadImg.single('img'), editProductValidation, productsController.update);
//ELIMINAR PRODUCTO
router.delete('/delete/:idProduct', isAdminMdw, productsController.delete);

module.exports = router;