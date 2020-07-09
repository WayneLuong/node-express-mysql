const express = require('express')
const path = require('path')
const mysql = require('mysql')

const logger = require('./middleware/logger')

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})
//connect to db
db.connect((err) => {
    if (err) throw err;
    console.log('mysql connected')
})

const app = express()

//SQL DB Route: create db if not created in phpmyadmin (throw errors if database is already specified)
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('database created...')
    })
})

//SQL DB Route: create table
app.get('/creatememberstable', (req, res) => {
    let sql = "CREATE TABLE members(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), active VARCHAR(255) DEFAULT 'active', PRIMARY KEY(id))"

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('members table created...')
    })
})

//SQL DB Route: Insert member 
app.get('/addmember', (req, res) => {
    //let member = { name: 'Bob', email: " test@email.com", active: "active" } (static)

    const member = { //new memberdata (dynamic) e.g. http://localhost:5000/addmember?name=test&email=test@email.com
        name: req.query.name,
        email: req.query.email,
        active: 'active'
    }
    let sql = 'INSERT INTO members SET ?' //? - parameter to take in member
    let query = db.query(sql, member, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('member added...')
    })
})

//SQL DB Route: select members
app.get('/getmembers', (req, res) => {
    let sql = "SELECT * FROM members"

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Members fetched..')
    })
})

//SQL DB Route: select single member (static)
app.get('/getmember/:id', (req, res) => {
    let sql = `SELECT * FROM members WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(`Member ${req.params.id} fetched..`)
    })
})

//SQL DB Route: update single member 
app.get('/updatemember/:id', (req, res) => {
    //let newName = 'Updated Jane' //(static)
    let newName = req.query.name //(dynamic) e.g. http://localhost:5000/updatemember/1?name=updatedname
    let sql = `UPDATE members SET name = '${newName}' WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(`Member ${req.params.id}, name: ${newName} updated ..`)
    })
})

//SQL DB Route: delete single member (static)
app.get('/deletemember/:id', (req, res) => {
    let sql = `DELETE FROM members WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(`Member ${req.params.id} deleted ..`)
    })
})

//init middleware
app.use(logger)
//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//2: Set a static (public) folder for server to use (/ and /about)
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(` Server started on PORT ${PORT}`))