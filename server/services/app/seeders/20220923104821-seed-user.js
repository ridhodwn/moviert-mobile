'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json').users;
    data = data.map(el => {
      let { username, email, password, role, phoneNumber, address } = el;
      password = hashPassword(password);
      const createdAt = new Date();
      const updatedAt = new Date();
      return { username, email, password, role, phoneNumber, address, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
