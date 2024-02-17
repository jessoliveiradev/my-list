const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const userController = require('../controllers/userController');

router.route('/')
  .post(authenticateToken, userController.createUser)
  .get(authenticateToken, userController.getAllUsers);

router.route('/:id')
  .get(authenticateToken, userController.getUserById)
  .put(authenticateToken, userController.updateUser)
  .delete(authenticateToken, userController.deleteUser);

module.exports = router;