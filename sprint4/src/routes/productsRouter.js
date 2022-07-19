//REQUIRES
const express = require('express');
const productsController = require('../controllers/productsController');
const multer = require('multer')
const path = require('path')

//ROUTER
const router = express.Router();

//DEFINICION STORAGE Y UPLOAD DE ARCHIVOS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_productImage${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage })

//LISTADO DE TODOS LOS PRODUCTOS
router.get('/', productsController.producto);

//FORMULARIOS CREACION Y EDICION
router.get('/create', productsController.create);
router.get('/edit/:idProduct', productsController.edit); 

//LISTADO POR CATEGORIA
router.get('/:idCategory', productsController.category);

//DETALLES DE PRODUCTO
router.get('/:idCategory/:idProduct', productsController.detail);

//AGREGAR PRODUCTO
router.post('/', upload.single('img'), productsController.add);

//EDITAR PRODUCTO
router.put('/:idCategory/:idProduct/', upload.single('img'), productsController.update);

//BORRAR PRODUCTO
router.delete('/delete/:idProduct/', productsController.delete);

module.exports = router;