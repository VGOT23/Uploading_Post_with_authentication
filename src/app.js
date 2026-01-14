const express = require('express')
const app = express()
const authRoutes = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const postRoutes = require('../src/routes/post.route')
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)





module.exports = app