'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json').casts;
    data = data.map(el => {
      let { movieId, name, profilePict } = el;
      const createdAt = new Date();
      const updatedAt = new Date();
      return { movieId, name, profilePict, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Casts', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Casts', null, {});
  }
};
