const prisma = require('../config/db')

exports.getAll = async (req, res) => {
  try {
    const items = await prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.create = async (req, res) => {
  try {
    const item = await prisma.announcement.create({ data: req.body })
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const item = await prisma.announcement.update({ where: { id: req.params.id }, data: req.body })
    res.json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await prisma.announcement.delete({ where: { id: req.params.id } })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
