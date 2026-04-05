const express    = require('express')
const cors       = require('cors')
const helmet     = require('helmet')
const dotenv     = require('dotenv')
const rateLimit  = require('express-rate-limit')

dotenv.config()

// Fail fast if critical env vars are missing
const required = ['DATABASE_URL', 'JWT_SECRET']
const missing  = required.filter(k => !process.env[k])
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`)
  process.exit(1)
}

const app = express()

app.use(helmet())
const ALLOWED_ORIGINS = [
  'https://mbeleemaisha.org',
  'https://www.mbeleemaisha.org',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // Allow server-to-server calls (no origin header)
    if (!origin) return cb(null, true)
    if (
      ALLOWED_ORIGINS.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /\.onrender\.com$/.test(origin)
    ) {
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
