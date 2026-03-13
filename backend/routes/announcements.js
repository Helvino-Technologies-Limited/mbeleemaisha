const router       = require('express').Router()
const Announcement = require('../models/Announcement')
const auth         = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const items = await Announcement.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const item = await Announcement.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
