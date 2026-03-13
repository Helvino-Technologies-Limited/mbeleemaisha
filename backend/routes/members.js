const router = require('express').Router()
const Member = require('../models/Member')
const auth   = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 })
    res.json(members)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const member = await Member.create(req.body)
    res.status(201).json(member)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(member)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
