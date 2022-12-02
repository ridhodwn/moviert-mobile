'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    static associate(models) {
      Cast.belongsTo(models.Movie, {
        foreignKey: 'movieId'
      })
    }
  }
  Cast.init({
    movieId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name is required'},
        notEmpty: {msg: 'Name is required'}
      }
    },
    profilePict: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};