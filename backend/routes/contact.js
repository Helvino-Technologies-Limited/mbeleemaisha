const router = require('express').Router()
const { submit, getAll } = require('../controllers/contactController')
const auth = require('../middleware/auth')

router.post('/',  submit)
router.get('/',   auth, getAll)

module.exports = router
