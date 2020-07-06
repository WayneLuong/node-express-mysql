const express = require('express')
const mysql = require('mysql')
const path = require('path')
const multer = require('multer')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemulter'
})

db.connect((err) => {
    if (err) throw err;
    console.log('mysql connected')
})




const app = express()

app.get('/uploads', (req, res) => {
    console.log(req, res)
    res.send('Uploaded')
})

app.use(express.static(path.join(__dirname, 'frontend')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))