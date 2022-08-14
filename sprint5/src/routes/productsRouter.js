//REQUIRES
const express = require('express');
const productsController = require('../controllers/productsController');
const multer = require('multer')
const path = require('path')
const guestMDW = require('../middlewares/guestMDW');

//ROUTER
const router = express.Router();

//DEFINICIÓN STORAGE Y UPLOAD DE ARCHIVOS
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

//FORMULARIOS CREACIÓN Y EDICIÓN
router.get('/create', guestMDW, productsController.create);
router.get('/edit/:idProduct', guestMDW, productsController.edit); 

//LISTADO POR CATEGORÍA
router.get('/:idCategory', productsController.category);

//DETALLE DE PRODUCTO
router.get('/:idCategory/:idProduct', productsController.detail);

//AGREGAR PRODUCTO
router.post('/', upload.single('img'), productsController.store);

//EDITAR PRODUCTO
router.put('/:idCategory/:idProduct/', upload.single('img'), productsController.update);

//ELIMINAR PRODUCTO
router.delete('/delete/:idProduct/', guestMDW, productsController.delete);

module.exports = router;