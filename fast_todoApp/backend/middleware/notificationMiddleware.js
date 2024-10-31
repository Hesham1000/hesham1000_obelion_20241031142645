const express = require('express');
const { Sequelize } = require('sequelize');

const router = express.Router();

const sequelize = new Sequelize('fast_todoApp', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306
});

router.get('/notifications/upcoming', async (req, res) => {
  try {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const tasks = await sequelize.query(
      `SELECT * FROM Tasks WHERE dueDate > NOW() AND dueDate <= DATE_ADD(NOW(), INTERVAL 1 DAY)`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({ upcomingTasks: tasks });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
