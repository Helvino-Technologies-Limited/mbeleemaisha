const router  = require('express').Router()
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const prisma  = require('../config/db')
const auth    = require('../middleware/auth')
const { login, register, me } = require('../controllers/authController')

router.post('/login',    login)
router.post('/register', register)
router.get('/me',        auth, me)

router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return res.status(400).json({ message: 'Current password is incorrect' })
    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } })
    res.json({ message: 'Password updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
