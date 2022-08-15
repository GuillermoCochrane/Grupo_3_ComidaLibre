const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const isGuestMdw = require('../middlewares/isGuestMdw');

//HOME
router.get('/', mainController.home);

//CARRITO DE COMPRAS
router.get('/cart', isGuestMdw, mainController.cart);
router.post('/cart/:id', isGuestMdw, mainController.cartAdd);
router.get('/cart/delete', isGuestMdw, mainController.cartDelete);
router.get('/cart/delete/:id', isGuestMdw, mainController.cartDelete);

//BARRA DE BUSQUEDA
router.get('/search', mainController.search);


module.exports = router;