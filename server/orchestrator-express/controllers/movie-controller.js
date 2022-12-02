const axios = require('axios');
const redis = require('../config/redis');

class MovieController {
    static async readMovies (req, res) {
        try {
            const movies = await redis.get('app:movies');
            if(movies) {
                res.status(200).json({data: JSON.parse(movies)});
            } else {
                const { data } = await axios.get('http://localhost:4002/movies');
                await redis.set('app:movies', JSON.stringify(data));
                res.status(200).json({data});
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    };
    
    static async readMovieById (req, res) {
        try {
            const { data } = await axios.get(`http://localhost:4002/movies/${req.params.id}`);
            const { data: user } = await axios.get(`http://localhost:4001/users/${data.UserMongoId}`);
            data.User = user.data
            res.status(200).json({data});
        } catch (error) {
            if(error.response.status === 400) {
                res.status(400).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async createMovie (req, res) {
        try {
            const { data } = await axios.post('http://localhost:4002/movies', 
                req.body
            );
            await redis.del('app:movies');
            res.status(201).json({data});
        } catch (error) {
            if(error.response.status === 400) {
                res.status(400).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async editMovieById (req, res) {
        try {
            const { data } = await axios.put(`http://localhost:4002/movies/${req.params.id}`, 
                req.body
            );
            await redis.del('app:movies');
            res.status(200).json({data});
        } catch (error) {
            if(error.response.status === 400) {
                res.status(400).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async deleteMovieById (req, res) {
        try {
            const { data } = await axios.delete(`http://localhost:4002/movies/${req.params.id}`);
            await redis.del('app:movies');
            res.status(200).json(data);
        } catch (error) {
            if(error.response.status === 400) {
                res.status(400).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
};

module.exports = MovieController;