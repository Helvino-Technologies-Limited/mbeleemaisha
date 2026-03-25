const router = require('express').Router()
const multer = require('multer')
const auth   = require('../middleware/auth')
const prisma = require('../config/db')

// Store file in memory (no disk — works on Render's ephemeral filesystem)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files are allowed'))
  },
})

// Upload T&C PDF — stored as base64 in the database
router.post('/terms', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const base64 = req.file.buffer.toString('base64')

    await prisma.siteContent.upsert({
      where:  { key: 'terms_pdf_base64' },
      update: { value: base64 },
      create: { key: 'terms_pdf_base64', value: base64 },
    })
    // Mark that the file exists so frontend can show the download link
    await prisma.siteContent.upsert({
      where:  { key: 'terms_pdf_url' },
      update: { value: '/api/upload/terms' },
      create: { key: 'terms_pdf_url', value: '/api/upload/terms' },
    })
    res.json({ url: '/api/upload/terms' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Serve T&C PDF — reads base64 from database and returns the file
router.get('/terms', async (req, res) => {
  try {
    const record = await prisma.siteContent.findUnique({ where: { key: 'terms_pdf_base64' } })
    if (!record) return res.status(404).json({ message: 'No terms document uploaded yet' })

    const buffer = Buffer.from(record.value, 'base64')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="terms-and-conditions.pdf"')
    res.setHeader('Content-Length', buffer.length)
    res.send(buffer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Remove T&C PDF
router.delete('/terms', auth, async (req, res) => {
  try {
    await prisma.siteContent.deleteMany({
      where: { key: { in: ['terms_pdf_base64', 'terms_pdf_url'] } },
    })
    res.json({ message: 'Removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
