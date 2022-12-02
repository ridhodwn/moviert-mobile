const { User } = require('../models');
const { validatePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class UserController {
    static async register(req, res, next) {
        try {
            console.log('register')
            let { username, email, password, phoneNumber, address } = req.body;
            const role = 'Admin';
            let userCreated = await User.create({username, email, password, role, phoneNumber, address});
            res.status(201).json(userCreated);
        } catch(error) {
            console.log(error)
            if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({message: error.errors[0].message});
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    };

    static async login(req, res, next) {
        try {
            console.log('login')
            let { email, password } = req.body;
            console.log('login')
            if(!email) {
                throw {name: 'Email is required'};
            }
            if(!password) {
                throw {name: 'Password is required'};
            }
            let userFound = await User.findOne({
                where: {email}
            });
            if(!userFound) {
                throw {name: 'Invalid email/password'};
            }
            let checkPassword = validatePassword(password, userFound.password);
            if(!checkPassword) {
                throw {name: 'Invalid email/password'};
            }
            const payload = {
                id: userFound.id
            };
            console.log(payload)
            const access_token = createToken(payload);
            res.status(200).json({access_token});
        } catch(error) {
            console.log(error)
            if(error.name === 'Email is required') {
                res.status(400).json({message: 'Email is required'})
            } else if(error.name === 'Password is required') {
                res.status(400).json({message: 'Password is required'})
            } else if(error.name === 'Invalid email/password') {
                res.status(401).json({message: 'Invalid email/password'})
            } else {
                res.status(500).json({message: 'Internal server error'});
            }
        }
    }
};

module.exports = UserController;