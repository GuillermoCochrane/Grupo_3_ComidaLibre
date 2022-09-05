const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const isGuestMdw = require('../middlewares/isGuestMdw');

//HOME
router.get('/', mainController.home);

//CARRITO DE COMPRAS
router.get('/cart', isGuestMdw, mainController.cart);
router.post('/cart/:idProduct', isGuestMdw, mainController.cartAdd);
router.get('/cart/delete', isGuestMdw, mainController.cartDeleteAll);
router.get('/cart/delete/:idProduct', isGuestMdw, mainController.cartDeleteOne);

//BARRA DE BUSQUEDA
router.get('/search', mainController.search);

//Favoritos
router.post('/fav/add/:idProduct', isGuestMdw, mainController.favAdd);
router.get('/fav/delete/:idProduct', isGuestMdw, mainController.favDelete);

//final comrpa
router.post('/sale', isGuestMdw, mainController.sale)

module.exports = router;