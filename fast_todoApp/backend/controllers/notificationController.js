const { Sequelize } = require('sequelize');
const { Task } = require('../models');

const sequelize = new Sequelize('fast_todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const getUpcomingTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const upcomingTasks = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const timeDiff = dueDate - now;
      return timeDiff > 0 && timeDiff <= oneDay;
    });
    res.json(upcomingTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch upcoming tasks' });
  }
};

module.exports = {
  getUpcomingTasks
};
