const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const validatePassword = (password, storedPassword) => bcrypt.compareSync(password, storedPassword);

module.exports = {
    hashPassword,
    validatePassword
};