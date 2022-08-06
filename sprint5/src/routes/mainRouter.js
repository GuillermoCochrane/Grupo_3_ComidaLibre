const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.home);
router.get('/cart', mainController.cart);
router.get('/notFound', mainController.notFound);
//barra de busqueda
router.get('/search', mainController.search);


module.exports = router;