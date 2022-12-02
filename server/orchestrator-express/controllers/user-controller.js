const axios = require('axios');
const redis = require('../config/redis');

class UserController {
    static async findUsers (req, res) {
        try {
            const users = await redis.get('app:users');
            if(users) {
                res.status(200).json({data: JSON.parse(users)});
            } else {
                const { data } = await axios.get('http://localhost:4001/users');
                await redis.set('app:users', JSON.stringify(data));
                res.status(200).json({data});
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    };
    
    static async findById (req, res) {
        try {
            const { data } = await axios.get(`http://localhost:4001/users/${req.params.user_id}`);
            res.status(200).json(data);
        } catch (error) {
            if(error.response.status === 400) {
                res.status(400).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async createUser (req, res) {
        try {
            const { data } = await axios.post('http://localhost:4001/users', 
                req.body
            );
            await redis.del('app:users');
            res.status(201).json({data});
        } catch (error) {
            if(error.response.status === 400) {
                res.status(400).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async deleteUser (req, res) {
        try {
            const { data } = await axios.delete(`http://localhost:4001/users/${req.params.user_id}`);
            await redis.del('app:users');
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

module.exports = UserController;