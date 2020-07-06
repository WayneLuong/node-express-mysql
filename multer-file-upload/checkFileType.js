const path = require('path')

//Check file type
function checkFileType(file, cb) {
    //Allowed ext
    const fileTypes = /jpeg|jpg|png|gif/
    //check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //check mime type
    const mimetype = fileTypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images Only')
    }
}

module.exports = checkFileType