'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('slug');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreId'
      });
      Movie.hasMany(models.Cast, {
        foreignKey: 'movieId'
      });
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Title is required'},
        notEmpty: {msg: 'Title is required'}
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Slug is required'},
        notEmpty: {msg: 'Slug is required'}
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Synopsis is required'},
        notEmpty: {msg: 'Synopsis is required'}
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Rating is required'},
        notEmpty: {msg: 'Rating is required'},
        min: {
          args: 1,
          msg: 'Minimum rating is 1'
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    UserMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  Movie.beforeCreate((instance, options) => {
    instance.slug = slugify(instance.title);
  });

  return Movie;
};