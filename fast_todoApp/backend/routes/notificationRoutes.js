const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fast_todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

router.get('/notifications/upcoming', async (req, res) => {
  try {
    await sequelize.authenticate();
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM tasks WHERE dueDate > NOW() AND dueDate <= DATE_ADD(NOW(), INTERVAL 1 DAY)`
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
