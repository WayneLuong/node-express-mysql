
const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const membersData = require('../../MembersData')

//router instead of app when in different folder(route)

//-------------Gets all members API-----------------
router.get('/', (req, res) => {
    res.json(membersData)
})

//-----------------Get single member-----------------
router.get('/:id', (req, res) => {
    //returns boolean
    const found = membersData.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(membersData.filter(member => member.id === parseInt(req.params.id)))
    } else {
        //Return 400 status not found with error message
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }
})

//-----------------Add a member-----------------
router.post('/', (req, res) => {
    const newMember = { //new memberdata
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {//Validation
        return res.status(400).json({ msg: `Please include name and email` })
    } else {
        //push new member to memberData array
        membersData.push(newMember)

        //Send JSON data from request - use Body Parser Middleware to get response data
        res.json(membersData)
        //res.send(res.body)

        //For handlbars redirect after POST req
        //res.redirect('/')
    }
})

//----------------- Update member-----------------
router.put('/:id', (req, res) => {
    //returns boolean
    const found = membersData.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updatedMember = req.body
        membersData.forEach(member => {
            //Update member.js database 
            if (member.id = parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name
                member.email = updatedMember.email ? updatedMember.email : member.email
            }
            res.json({ msg: 'Member updated', member: member });
        })
    } else {
        //Return 400 status not found with error message
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }
})

//-----------------Delete single member-----------------
router.delete('/:id', (req, res) => {
    //returns boolean
    const found = membersData.some(member => member.id === parseInt(req.params.id))

    if (found) {
        //return members without deleted member
        res.json({
            msg: `Member ${req.params.id} deleted`,
            members: membersData.filter(member => member.id !== parseInt(req.params.id))
        })
    } else {
        //Return 400 status not found with error message
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }
})

module.exports = router