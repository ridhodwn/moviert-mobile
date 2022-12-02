const router = require('express').Router();
const userRouter = require('./user-route');
const movieRouter = require('./movie-route');

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;