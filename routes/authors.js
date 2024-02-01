const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);
router.post('/', validation.saveProj, authorsController.createAuthor);
router.put('/:id', validation.saveProj, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;