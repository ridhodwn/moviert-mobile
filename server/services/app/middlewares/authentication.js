const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
    try {
        let access_token = req.headers.access_token;
        if(!access_token) {
            throw {name: 'Unauthorized'};
        }
        let payload = verifyToken(access_token);
        let user = await User.findByPk(payload.id);
        if(!user) {
            throw {name: 'Unauthorized'};
        }
        req.user = {
            id: user.id,
            role: user.role
        };
        next();
    } catch(error) {
        if(error.name === 'Unauthorized') {
            res.status(401).json({message: 'Unauthorized'});
        } else if(error.name === 'JsonWebTokenError') {
            res.status(401).json({message: 'Invalid token'});
        } else {
            res.status(500).json({message: 'Internal server error'});
        }
    }
}

module.exports = authentication;