'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Movies', 'UserMongoId', { type: Sequelize.DataTypes.STRING });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Movies', 'UserMongoId');
  }
};
