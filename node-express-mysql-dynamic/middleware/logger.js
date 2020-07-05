const moment = require('moment')

const logger = (req, res, next) => {
    //Get the url hit and datetime 
    console.log(`${req.protocol}: //${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    //Goes to next handler
    next()
}

module.exports = logger