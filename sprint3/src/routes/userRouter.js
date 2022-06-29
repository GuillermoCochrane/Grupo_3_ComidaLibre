const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.profile);
router.get('/login', userController.log);
router.get('/register', userController.reg);

module.exports = router;