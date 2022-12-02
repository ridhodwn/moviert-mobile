const { Genre } = require('../models');

class GenreController {
    static async readGenres(req, res, next) {
        try {
            let genres = await Genre.findAll();
            res.status(200).json(genres);
        } catch(error) {
            res.status(500).json({message: 'Internal server error'});
        }
    };

    static async createGenre(req, res, next) {
        try {
            let { name } = req.body;
            let genreCreated = await Genre.create({name});
            res.status(201).json(genreCreated);
        } catch(error) {
            res.status(500).json({message: 'Internal server error'});
        }
    };

    static async readGenreById(req, res, next) {
        try {
            console.log('read Genre')
            let id = req.params.id;
            let genreFound = await Genre.findByPk(id);
            if(!genreFound) {
                throw {name: 'Genre not found'};
            }
            res.status(200).json(genreFound);
        } catch(error) {
            console.log(error)
            if(error.name === 'Genre not found') {
                res.status(400).json({message: 'Genre not found'});
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    };

    static async editGenreById(req, res, next) {
        try {
            console.log('read Genre')
            let id = req.params.id;
            let { name } = req.body;
            let genreFound = await Genre.findByPk(id);
            if(!genreFound) {
                throw {name: 'Genre not found'};
            }
            let genreUpdated = await genreFound.update({name})
            res.status(200).json(genreUpdated);
        } catch(error) {
            console.log(error)
            if(error.name === 'Genre not found') {
                res.status(400).json({message: 'Genre not found'});
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    };

    static async deleteGenreById (req, res, next) {
        try {
            let id = req.params.id;
            let genreFound = await Genre.findByPk(id);
            if(!genreFound) {
                throw {name: 'Genre not found'};
            }
            await Genre.destroy({
                where: {id}
            });
            res.status(200).json({message: `Genre id ${id} deleted`});
        } catch(error) {
            console.log(error)
            if(error.name === 'Genre not found') {
                res.status(400).json({message: 'Genre not found'});
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    };
}

module.exports = GenreController;