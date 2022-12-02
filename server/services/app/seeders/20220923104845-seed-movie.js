'use strict';

const slugify = require('slug');

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json').movies;
    data = data.map(el => {
      let { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId } = el;
      const slug = slugify(title);
      const createdAt = new Date();
      const updatedAt = new Date();
      return { title, slug, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Movies', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
