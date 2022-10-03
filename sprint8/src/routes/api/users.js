const express = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController');
const router = express.Router();

//LISTADO DE TODOS LOS PRODUCTOS
router.get('/username/:username', usersAPIController.findByUsername);
router.get('/email/:email', usersAPIController.findByEmail);

module.exports = router;