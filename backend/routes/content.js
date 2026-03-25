const router = require('express').Router()
const { getAll, upsertMany } = require('../controllers/contentController')
const auth = require('../middleware/auth')

router.get('/', getAll)
router.put('/', auth, upsertMany)

module.exports = router
