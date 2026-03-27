const express    = require('express')
const cors       = require('cors')
const helmet     = require('helmet')
const dotenv     = require('dotenv')
const rateLimit  = require('express-rate-limit')

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({
  origin: (origin, cb) => {
    // Allow server-to-server calls (no origin), localhost, and all Vercel previews
    if (!origin) return cb(null, true)
    const allowed = [
      process.env.CLIENT_URL,
      'http://localhost:3000',
    ]
    if (allowed.includes(origin) || /\.vercel\.app$/.test(origin) || /\.onrender\.com$/.test(origin)) {
      return cb(null, true)
    }
    cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }))

// Routes
app.use('/api/auth',          require('./routes/auth'))
app.use('/api/members',       require('./routes/members'))
app.use('/api/announcements', require('./routes/announcements'))
app.use('/api/contact',       require('./routes/contact'))
app.use('/api/content',       require('./routes/content'))
app.use('/api/upload',        require('./routes/upload'))

app.get('/',        (req, res) => res.json({ message: 'Mbelee Maisha API is running' }))
app.get('/health',  (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
