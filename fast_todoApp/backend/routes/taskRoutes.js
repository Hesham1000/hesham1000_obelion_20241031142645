const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fast_todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const Task = sequelize.define('Task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  priority: {
    type: Sequelize.ENUM('low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'low'
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

const taskController = {
  getTasks: async () => {
    return await Task.findAll();
  },
  createTask: async (taskData) => {
    return await Task.create(taskData);
  },
  updateTask: async (taskId, updatedTaskData) => {
    await Task.update(updatedTaskData, {
      where: { id: taskId }
    });
    return await Task.findByPk(taskId);
  },
  deleteTask: async (taskId) => {
    return await Task.destroy({
      where: { id: taskId }
    });
  }
};

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskController.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await taskController.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const updatedTask = await taskController.updateTask(taskId, updatedTaskData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await taskController.deleteTask(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;