const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const guestMDW = require('../middlewares/guestMDW');

router.get('/', mainController.home);
router.get('/cart', guestMDW, mainController.cart);
router.get('/notFound', mainController.notFound);
//barra de busqueda
router.get('/search', mainController.search);


module.exports = router;