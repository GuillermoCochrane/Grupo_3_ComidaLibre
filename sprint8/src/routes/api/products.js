const express = require('express');
const productsAPIController = require('../../controllers/api/productsAPIController');
const router = express.Router();

//LISTADO DE TODOS LOS PRODUCTOS
router.get('/name/:productname', productsAPIController.findByName);

module.exports = router;