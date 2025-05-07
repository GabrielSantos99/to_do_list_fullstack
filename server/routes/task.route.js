const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);

router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

router.patch('/:id/completed', taskController.markAsDone);

router.get('/statuses', taskController.getTaskStatuses);

module.exports = router;
