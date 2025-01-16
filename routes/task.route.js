const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth')

const { addTask, getTaskById, getTasksByUserId, getTasksByCategory, updateTask, deleteTask, getAllTasks } = require('../controller/task.controller');

router.post('/', auth, addTask);
router.get('/:id', auth, getTaskById);
router.get('/user/:userId', auth, getTasksByUserId);
router.get('/category/:category', auth, getTasksByCategory);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.get('/', auth, getAllTasks); // Optional

module.exports = router;