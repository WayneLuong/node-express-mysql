const express = require('express')
const path = require('path')
const multer = require('multer')

const checkFileType = require('./checkFileType')

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
    limits: { fileSize: 1000000 }, //file size limit in bytes
    //Filter by file type
    fileFilter: (req, file, cb) => {
        //Pass file to check file type
        checkFileType(file, cb);
    }
}).single('myImage') //single file - takes in name // can take in multiple

//Init App
const app = express()

//Static page
//app.use(express.static(path.join(__dirname, 'frontend')))
//React page path to build folder
app.use(express.static(path.join(__dirname, 'frontend', 'react-frontend', 'build')))

//Post request 
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            /* res.render('index', {
                msg: err
            }) */
            console.log(err)
            res.redirect('/')
        } else {
            //check if file field is empty
            if (req.file == undefined) {
                console.log('No file selected')
                res.redirect('/')
            } else {
                //logs the file information, for databases
                console.log(req.file)
                res.send(`Uploaded: ${req.file.filename}`)
            }
        }
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))