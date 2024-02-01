const express = require('express');
const router = express.Router();

const loansController = require('../controllers/loans');
const validation = require('../middleware/validate');

router.get('/', loansController.getAll);
router.get('/:id', loansController.getSingle);
router.post('/', validation.saveLoan , loansController.createLoan);
router.put('/:id', validation.saveLoan , loansController.updateLoan);
router.delete('/:id', loansController.deleteLoan);

module.exports = router;
