const router = require('express').Router();
const cardCtrl = require('../controllers/card');

const auth = require ('../middleware/auth')

router.post('/', auth, cardCtrl.createCard)
router.put('/:id', auth, cardCtrl.updateCard)
router.delete('/:id', auth, cardCtrl.deleteCard)
router.get('/:id', cardCtrl.getOneCard)
router.get('/', cardCtrl.getAllCard)

module.exports = router; 