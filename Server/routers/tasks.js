const express = require('express')
const router = express.Router()

const { addTask, getAllTasks, updateTask, deleteTask, getTaskByName } = require('../controllers/tasks')
router.post('/', addTask)
router.get('/', getAllTasks)
router.delete('/:id', deleteTask)
router.put('/:taskId', updateTask)
router.get('/:name', getTaskByName)

module.exports = router;
