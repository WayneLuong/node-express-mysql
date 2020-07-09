const express = require('express')
const mysql = require('mysql')
const router = express.Router()

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

//Get all members
router.get('/', (req, res) => {
    let sql = "SELECT * FROM members"

    //Return JSON data
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

//Get single member
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM members WHERE id=${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

//Delete single member
router.delete('/delete/:id', (req, res) => {
    let sql = `DELETE FROM members WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(`Member ${req.params.id} deleted ..`)
    })
})

//Add single member
router.post('/add', (req, res) => {
    const { name, email } = req.query //new memberdata (dynamic) e.g. http://localhost:5000/api/members/add?name=test&email=test@email.com

    let sql = `INSERT INTO members (name, email) VALUES ('${name}', '${email}')` //use '' for String data

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send({ msg: 'Member added...', data: result })
        //res.redirect('/')
    })
})

//Udate single member 
router.put('/update/:id', (req, res) => {
    let newName = req.query.name //(dynamic) e.g. http://localhost:5000/api/members/update/1?name=updatedname
    let newEmail = req.query.email
    let sql = `UPDATE members SET name = '${newName}', email = '${newEmail}' WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json({ msg: `Member ${req.params.id}, name: ${newName} - email: ${newEmail} updated ..` })
    })
})

module.exports = router