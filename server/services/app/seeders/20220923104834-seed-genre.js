'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json').genres;
    data = data.map(el => {
      let { name } = el;
      const createdAt = new Date();
      const updatedAt = new Date();
      return { name, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Genres', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
