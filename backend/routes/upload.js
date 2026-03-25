const router  = require('express').Router()
const multer  = require('multer')
const path    = require('path')
const fs      = require('fs')
const auth    = require('../middleware/auth')
const prisma  = require('../config/db')

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, 'terms-and-conditions.pdf'),
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files are allowed'))
  },
})

router.post('/terms', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const value = '/uploads/terms-and-conditions.pdf'
    await prisma.siteContent.upsert({
      where:  { key: 'terms_pdf_url' },
      update: { value },
      create: { key: 'terms_pdf_url', value },
    })
    res.json({ url: value })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/terms', auth, async (req, res) => {
  try {
    const filePath = path.join(uploadDir, 'terms-and-conditions.pdf')
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    await prisma.siteContent.deleteMany({ where: { key: 'terms_pdf_url' } })
    res.json({ message: 'Removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
