const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.producto);
// Agregó FC
router.get('/create', productsController.add);
//
router.get('/edit', productsController.edit); //agregada por guille
router.get('/:idCategory', productsController.category);
router.get('/:idCategory/:idProduct', productsController.detail);

module.exports = router;