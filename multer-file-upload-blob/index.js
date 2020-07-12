const express = require('express')
const path = require('path')
require("dotenv").config()

//Init App
const app = express()

//Image API routes
app.use('/upload', require('./routes/imageUpload'));

//Static page
//app.use(express.static(path.join(__dirname, 'frontend')))
//React page path to build folder
app.use(express.static(path.join(__dirname, 'frontend', 'react-frontend', 'build')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))