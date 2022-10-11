const express = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController');
const router = express.Router();

router.get('/', usersAPIController.allUsers)
router.get('/table', usersAPIController.allUsersTable)
router.get('/username/:username', usersAPIController.findByUsername);
router.get('/email/:email', usersAPIController.findByEmail);
router.get('/:id', usersAPIController.oneUser)

module.exports = router;