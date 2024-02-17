const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const taskController = require('../controllers/taskController');

router.route('/')
  .post(authenticateToken, taskController.createTask)
  .get(authenticateToken, taskController.getAllTasks);

router.route('/:id')
  .get(authenticateToken, taskController.getTaskById)
  .put(authenticateToken, taskController.updateTask)
  .delete(authenticateToken, taskController.deleteTask);

module.exports = router;
