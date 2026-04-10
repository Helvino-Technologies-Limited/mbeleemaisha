const prisma = require('../config/db')

exports.getAll = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: { dependants: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(members)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getOne = async (req, res) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: req.params.id },
      include: { dependants: true },
    })
    if (!member) return res.status(404).json({ message: 'Member not found' })
    res.json(member)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.create = async (req, res) => {
  try {
    const { name, phone, email, idNumber, category, package: pkg, registrationDate, nextOfKin, dependants } = req.body
    const member = await prisma.member.create({
      data: {
        name, phone, email, idNumber,
        category, package: pkg,
        registrationDate: registrationDate ? new Date(registrationDate) : null,
        nextOfKin: nextOfKin || null,
        dependants: dependants?.length
          ? { create: dependants.map(d => ({ name: d.name, relationship: d.relationship, dob: d.dob ? new Date(d.dob) : null })) }
          : undefined,
      },
      include: { dependants: true },
    })
    res.status(201).json(member)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const member = await prisma.member.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    })
    res.json(member)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await prisma.member.delete({ where: { id: req.params.id } })
    res.json({ message: 'Member deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.stats = async (req, res) => {
  try {
    const [total, active, pending] = await Promise.all([
      prisma.member.count(),
      prisma.member.count({ where: { status: 'ACTIVE' } }),
      prisma.member.count({ where: { status: 'PENDING' } }),
    ])
    res.json({ total, active, pending })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
