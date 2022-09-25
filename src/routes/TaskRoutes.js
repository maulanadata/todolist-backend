const express = require('express');
const TaskControllers = require('../controllers/TaskControllers');
const router = express.Router();

const TaskRouter = require('../controllers/TaskControllers');

router.get('/all', TaskControllers.getAllTask);
router.get('/', TaskControllers.searchTask);
router.post('/', TaskRouter.createTask);
router.get('/:idTask', TaskControllers.getTaskById);
router.put('/:idTask', TaskControllers.updateTask);
router.delete('/:idTask', TaskControllers.deleteTask);


module.exports = router;
