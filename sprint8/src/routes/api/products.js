const express = require('express');
const productsAPIController = require('../../controllers/api/productsAPIController');
const router = express.Router();

const productMDW = require('../../middlewares/productValidation')
const editMDW = require('../../middlewares/editProductValidation')
const uploadImg = require('../../middlewares/multerProducts')

router.get('/', productsAPIController.products)
router.get('/last', productsAPIController.lastProduct)
router.get('/sales', productsAPIController.sales)
router.post('/create', uploadImg.single("img"), productMDW, productsAPIController.create)//testing
router.put('/edit/:idProduct', uploadImg.single("img"), editMDW, productsAPIController.edit)//testing
router.delete('/delete/:idProduct', productsAPIController.delete)//testing
router.get('/name/:productname', productsAPIController.findByName);
router.get('/:id', productsAPIController.oneProduct)

module.exports = router;