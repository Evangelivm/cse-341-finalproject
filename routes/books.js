const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validation.saveProj, booksController.createBook);
router.put('/:id', validation.saveProj, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;