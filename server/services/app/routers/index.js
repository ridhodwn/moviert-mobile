const router = require('express').Router();
const userRouter = require('./user-router');
const movieRouter = require('./movie-router');
const genreRouter = require('./genre-router');

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/genres', genreRouter);

module.exports = router;