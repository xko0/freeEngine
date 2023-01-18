const router = require('express').Router();
const propositionCtrl = require('../controllers/proposition');

const auth = require ('../middleware/auth')

router.post('/', propositionCtrl.createProposition)
router.get('/', auth, propositionCtrl.getAllPropositions)
router.get('/:id', auth, propositionCtrl.getOneProposition)
router.delete('/:id', auth, propositionCtrl.deleteProposition)

module.exports = router; 