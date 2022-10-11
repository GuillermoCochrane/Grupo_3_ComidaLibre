const express = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController');
const router = express.Router();

const loginMDW = require('../../middlewares/loginValidations')

router.get('/', usersAPIController.users)
router.get('/last', usersAPIController.lastUser)
router.post('/login', loginMDW, usersAPIController.login)//testing
router.get('/table', usersAPIController.allUsersTable)
router.get('/username/:username', usersAPIController.findByUsername);
router.get('/email/:email', usersAPIController.findByEmail);
router.get('/:id', usersAPIController.oneUser)

module.exports = router;