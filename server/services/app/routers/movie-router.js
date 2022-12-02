const router = require('express').Router();
const MovieController = require('../controllers/movie-controller');

router.get('/', MovieController.readMovies);
router.post('/', MovieController.createMovie);
router.get('/:id', MovieController.readMovieById);
router.put('/:id', MovieController.editMovieById);
router.delete('/:id', MovieController.deleteMovieById);

module.exports = router;