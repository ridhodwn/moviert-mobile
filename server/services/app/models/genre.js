'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Movie, {
        foreignKey: 'genreId'
      });
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Genre name is required'},
        notEmpty: {msg: 'Genre name is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};