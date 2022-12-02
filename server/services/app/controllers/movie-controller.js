const { Genre, Movie, Cast, sequelize } = require('../models');
const slugify = require('slug');

class MovieController {
    static async readMovies(req, res, next) {
        try {
            let movies = await Movie.findAll({
                include: [Genre, Cast]
            });
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async readMovieById(req, res, next) {
        try {
            let id = req.params.id;
            let movieFound = await Movie.findByPk(id, {
                include: [Genre, Cast]
            });
            if (!movieFound) {
                throw { name: 'Movie not found' };
            }
            res.status(200).json(movieFound);
        } catch (error) {
            if (error.name === 'Movie not found') {
                res.status(400).json({ message: 'Movie not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async createMovie(req, res, next) {
        const t = await sequelize.transaction();
        try {
            let { title, synopsis, trailerUrl, imgUrl, rating, genreId, Casts, UserMongoId } = req.body;
            if (!genreId) {
                genreId = 1
            }
            let slug = slugify(title);
            let movieCreated = await Movie.create({title, slug, synopsis, trailerUrl, imgUrl, rating, genreId, UserMongoId}, {
                transaction: t
            });
            await Promise.all(Casts.map((cast) => {
                let { name, profilePict } = cast;
                Cast.create({movieId: movieCreated.id, name, profilePict});
            }), { transaction: t });
            await t.commit();
            res.status(201).json(movieCreated);
        } catch (error) {
            await t.rollback();
            if(error.name === 'SequelizeValidationError') {
                res.status(400).json({message: error.errors[0].message});
            } else if(error.name === 'Error') {
                res.status(400).json({message: 'Title is required'});
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    };

    static async editMovieById(req, res, next) {
        try {
            let id = req.params.id;
            let { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
            let movieFound = await Movie.findByPk(id);
            if (!movieFound) {
                throw { name: 'Movie not found' };
            }
            let movieUpdated = await movieFound.update({ title, synopsis, trailerUrl, imgUrl, rating, genreId })
            res.status(200).json(movieUpdated);
        } catch (error) {
            if (error.name === 'Movie not found') {
                res.status(400).json({ message: 'Movie not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async deleteMovieById(req, res, next) {
        try {
            let id = req.params.id;
            let movieFound = await Movie.findByPk(id);
            if (!movieFound) {
                throw { name: 'Movie not found' };
            }
            await Movie.destroy({
                where: { id }
            });
            res.status(200).json({ message: `Movie id ${id} deleted` });
        } catch (error) {
            if (error.name === 'Movie not found') {
                res.status(400).json({ message: 'Movie not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
};

module.exports = MovieController;