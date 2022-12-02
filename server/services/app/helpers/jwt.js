const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createToken = (payload) => jwt.sign(payload, 'secretKey123');
const verifyToken = (access_token) => jwt.verify(access_token, 'secretKey123');

module.exports = {
    createToken,
    verifyToken
};