const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const path = require('path')
const multer = require('multer')
var fs = require('fs');

const checkFileType = require('../checkFileType')

function base64_decode(base64Image, file) {
    fs.writeFileSync(file, base64Image);
    console.log('******** File created from base64 encoded string ********');

}

//Create db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//Connect db
db.connect((err) => {
    if (err) throw err
    console.log('DB connected')
})

//Start storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
    }
})

//init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, //file size limit in bytes
    //Filter by file type
    //fileFilter: (req, file, cb) => {
    //Pass file to check file type
    //checkFileType(file, cb);
    //}
}).single('myImage') //single file - takes in name // can take in multiple

//Post request 
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.redirect('/')
        } else {
            //check if file field is empty
            if (req.file == undefined) {
                console.log('No file selected')
                res.redirect('/')
            } else {
                //Turn to base64 encoding
                const contents = fs.readFileSync(req.file.path, { encoding: 'base64' });
                let sql = `INSERT images SET name = '${req.file.originalname}', file = '${contents}', mimeType = '${req.file.mimetype}'`

                db.query(sql, (err, result) => {
                    if (err) throw err;
                    //logs the file information, for databases
                    console.log(req.file, contents, result)
                    res.send(`Uploaded: ${req.file.filename}`)
                })
            }
        }
    })
})

router.get('/', (req, res) => {
    let sql = "SELECT * FROM images"

    //Return JSON data
    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result)
    })
})

module.exports = router