const express = require('express');
const router = express.Router();

const teamController = require('../controllers/team-members');
const validation = require('../middleware/validate');

router.get('/', teamController.getAll);
router.get('/:id', teamController.getSingle);
router.post('/', validation.saveTeamMem,teamController.createTeamMem);
router.put('/:id', validation.saveTeamMem, teamController.updateTeamMem);
router.delete('/:id', validation.saveTeamMem, teamController.deleteTeamMem);


module.exports = router;