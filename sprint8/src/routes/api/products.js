const express = require('express');
const productsAPIController = require('../../controllers/api/productsAPIController');
const router = express.Router();

router.get('/', productsAPIController.products)
router.get('/sales', productsAPIController.sales)
router.get('/name/:productname', productsAPIController.findByName);
router.get('/:id', productsAPIController.oneProduct)

module.exports = router;