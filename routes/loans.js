const express = require('express');
const router = express.Router();

const loansController = require('../controllers/loans');
const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate")

router.get('/', isAuthenticated, loansController.getAll);
router.get('/:id', isAuthenticated, loansController.getSingle);
router.post('/', isAuthenticated, validation.saveLoan , loansController.createLoan);
router.put('/:id', isAuthenticated, validation.saveLoan , loansController.updateLoan);
router.delete('/:id', isAuthenticated, loansController.deleteLoan);

module.exports = router;
