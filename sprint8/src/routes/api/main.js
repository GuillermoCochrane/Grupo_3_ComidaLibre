const express = require('express');
const mainAPIController = require('../../controllers/api/mainAPIController');
const router = express.Router();

router.get('/search/:searchKey', mainAPIController.search);

module.exports = router;