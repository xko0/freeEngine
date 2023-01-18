const router = require('express').Router();
const categoryCtrl = require('../controllers/category');

const auth = require('../middleware/auth')

router.post('/', auth, categoryCtrl.createCategory)
router.put('/:id', auth, categoryCtrl.updateCategory)
router.delete('/:id', auth, categoryCtrl.deleteCategory)
router.get('/', categoryCtrl.getCategory)

module.exports = router; 