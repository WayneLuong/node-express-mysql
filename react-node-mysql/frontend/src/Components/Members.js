import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Member from './Member'

import Add from './Add'

export default function Members() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        getMembers()
    }, [])

    const getMembers = () => {
        axios.get('http://localhost:5000/api/members')
            .then(res => {
                console.log('GET ALL MEMBERS: ', res.data)
                setMembers(res.data)
            })
    }
    const addMember = (name, email) => {
        axios.post(`http://localhost:5000/api/members/add?name=${name}&email=${email}`)
            .then(res => {
                console.log('Data: ', res.data)
                getMembers()
            })
    }
    const deleteMember = (id) => {
        axios.delete(`http://localhost:5000/api/members/delete/${id}`)
            .then(res => {
                console.log(res.data)
                getMembers()
            })
    }
    const updateMember = (id, name, email) => {
        axios.put(`http://localhost:5000/api/members/update/${id}?name=${name}&email=${email}`)
            .then(res => {
                console.log(res.data)
                getMembers()
            })
    }

    return (
        <div>
            <h1>Members Lists</h1>
            <ul>
                {members.map(member => (
                    <Member key={member.id} member={member} deleteMember={deleteMember} updateMember={updateMember} />
                ))}
            </ul>
            <Add addMember={addMember} />
        </div>
    )
}
