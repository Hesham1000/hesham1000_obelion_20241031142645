module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('tasks', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('tasks', null, {})
};
