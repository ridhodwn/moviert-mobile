const router = require('express').Router();
const Controller = require('../controllers');

router.get('/users', Controller.findUsers);
router.post('/users', Controller.createUser);
router.get('/users/:user_id', Controller.findById);
router.delete('/users/:user_id', Controller.deleteUser);

module.exports = router;