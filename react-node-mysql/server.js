const express = require('express')
const cors = require('cors')
require("dotenv").config()
const path = require('path')

const app = express()

//Middleware
app.use(cors())

//Members API routes
app.use('/api/members', require('./routes/api/members'));

//Frontend
app.use(express.static(path.join(__dirname, 'frontend', 'build')))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port: ${PORT}`))