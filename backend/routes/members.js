const router = require('express').Router()
const { getAll, getOne, create, updateStatus, remove, stats } = require('../controllers/memberController')
const auth = require('../middleware/auth')

router.get('/',           auth, getAll)
router.get('/stats',      auth, stats)
router.get('/:id',        auth, getOne)
router.post('/',               create)
router.patch('/:id/status', auth, updateStatus)
router.delete('/:id',     auth, remove)

module.exports = router
