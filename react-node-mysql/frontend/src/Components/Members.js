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
                console.log(res.data)
                setMembers(res.data)
            })
    }
    const deleteMember = (id) => {
        axios.delete(`http://localhost:5000/api/members/delete/${id}`)
    }
    const updateMember = (id, name, email) => {
        axios.put(`http://localhost:5000/api/members/update/${id}?name=${name}&email=${email}`)
    }

    return (
        <div>
            <h1>Members Lists</h1>
            <ul>
                {members.map(member => (
                    <Member key={member.id} member={member} deleteMember={deleteMember} updateMember={updateMember} />
                ))}
            </ul>
            <Add />
        </div>
    )
}
