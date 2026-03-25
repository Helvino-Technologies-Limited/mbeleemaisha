const prisma = require('../config/db')

exports.getAll = async (req, res) => {
  try {
    const items = await prisma.siteContent.findMany()
    const content = {}
    items.forEach(i => { content[i.key] = i.value })
    res.json(content)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.upsertMany = async (req, res) => {
  try {
    const updates = Object.entries(req.body)
    await Promise.all(
      updates.map(([key, value]) =>
        prisma.siteContent.upsert({
          where:  { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      )
    )
    res.json({ message: 'Saved' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
