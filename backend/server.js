const express = require('express')
const cors    = require('cors')
const helmet  = require('helmet')
const dotenv  = require('dotenv')
const rateLimit = require('express-rate-limit')

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

// Routes
app.use('/api/auth',          require('./routes/auth'))
app.use('/api/members',       require('./routes/members'))
app.use('/api/announcements', require('./routes/announcements'))

app.get('/', (req, res) => res.json({ message: 'Mbelee Maisha API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
