const router = require('express').Router();
const GenreController = require('../controllers/genre-controller');

router.get('/', GenreController.readGenres);
router.post('/', GenreController.createGenre);
router.get('/:id', GenreController.readGenreById);
router.put('/:id', GenreController.editGenreById);
router.delete('/:id', GenreController.deleteGenreById);

module.exports = router;