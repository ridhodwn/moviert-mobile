const User = require('../models/User');
const { hashPassword } = require('../helpers/bcrypt');

class Controller {
    static findUsers(req, res) {
        User.findAll()
        .then((data) => {
            data = data.map(el => {
                const { _id, username, email, role, phoneNumber, address} = el;
                return {_id, username, email, role, phoneNumber, address}
            });
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({message: 'Internal server error'});
        });
    };

    static async findById(req, res) {
        try {
            let data = await User.findById(req.params.user_id);
            if (!data) {
                throw { name: 'User not found' };
            }
            res.status(200).json({
                _id: data._id,
                username: data.username,
                email: data.email, 
                role: data.role, 
                phoneNumber: data.phoneNumber, 
                address: data.address
            });
        } catch (error) {
            if (error.name === 'BSONTypeError' || error.name === 'User not found') {
                res.status(400).json({ message: 'User not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async createUser(req, res) {
        try {
            let { username, email, password, phoneNumber, address } = req.body;
            if(!email) {
                throw {name: 'Email is required'};
            } else if (!email.includes('@')) {
                throw {name: 'Invalid email format'};
            }
            if(!password) {
                throw {name: 'Password is required'};
            } else if (password.length < 5) {
                throw {name: 'Password must have at least 5 characters'};
            }

            let userFound = await User.findByEmail(email);
            if(userFound) {
                throw {name: 'Email is already being used'};
            }

            const role = 'Admin';
            password = hashPassword(password);
            let data = await User.create({username, email, password, role, phoneNumber, address});
            res.status(200).json({
                _id: data.insertedId, username,
                email, role, phoneNumber, address
            });
        } catch (error) {
            if(error.name === 'Email is required') {
                res.status(400).json({message: 'Email is required'})
            } else if(error.name === 'Invalid email format') {
                res.status(400).json({message: 'Invalid email format'})
            } else if(error.name === 'Email is already being used') {
                res.status(400).json({message: 'Email is already being used'})
            } else if(error.name === 'Password is required') {
                res.status(400).json({message: 'Password is required'})
            } else if(error.name === 'Password must have at least 5 characters') {
                res.status(400).json({message: 'Password must have at least 5 characters'})
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    };

    static async deleteUser(req, res) {
        try {
            let userFound = await User.findById(req.params.user_id);
            if (!userFound) {
                throw { name: 'User not found' };
            }
            await User.delete(userFound._id);
            res.status(200).json({ message: `User id ${req.params.user_id} deleted` });
        } catch (error) {
            if (error.name === 'BSONTypeError' || error.name === 'User not found') {
                res.status(400).json({ message: 'User not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
};

module.exports = Controller;