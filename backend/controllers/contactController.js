const prisma = require('../config/db')

exports.submit = async (req, res) => {
  try {
    const contact = await prisma.contact.create({ data: req.body })
    res.status(201).json({ message: 'Message received', id: contact.id })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
