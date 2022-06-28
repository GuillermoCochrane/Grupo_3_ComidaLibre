const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.home);
router.get('/login', mainController.log);
router.get('/register', mainController.reg);
router.get('/cart', mainController.cart);
router.get('/notFound', mainController.notFound);


module.exports = router;