const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.get('/', UserController.findUsers);
router.post('/', UserController.createUser);
router.get('/:user_id', UserController.findById);
router.delete('/:user_id', UserController.deleteUser);

module.exports = router;