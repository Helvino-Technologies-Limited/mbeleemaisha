const router = require('express').Router()
const { getAll, getOne, create, updateStatus, updateDetails, remove, stats, addDependants, removeDependant } = require('../controllers/memberController')
const auth = require('../middleware/auth')

router.get('/',           auth, getAll)
router.get('/stats',      auth, stats)
router.get('/:id',        auth, getOne)
router.post('/',               create)
router.patch('/:id/status',            auth, updateStatus)
router.patch('/:id',                   auth, updateDetails)
router.post('/:id/dependants',         auth, addDependants)
router.delete('/:id/dependants/:depId', auth, removeDependant)
router.delete('/:id',                  auth, remove)

module.exports = router
