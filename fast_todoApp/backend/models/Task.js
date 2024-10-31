const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Assuming there is a connection file

class Task extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'low',
      },
    }, {
      sequelize,
      modelName: 'tasks', // Matching the table name in the database
      tableName: 'tasks',
      timestamps: false, // Disabling timestamps
    });
  }
}

module.exports = Task;