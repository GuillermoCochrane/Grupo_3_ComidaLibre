const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.producto);
router.get('/detalles/:idProduct', productsController.detail);

module.exports = router;