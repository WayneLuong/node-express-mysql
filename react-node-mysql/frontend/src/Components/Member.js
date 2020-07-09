import React, { useState } from 'react'

export default function Member({ member, deleteMember, updateMember }) {
    const [nameState, setnameState] = useState({ name: '' })
    const [emailState, setemailState] = useState('')

    const handleNameChange = (e) => {
        setnameState({ [e.target.name]: e.target.value })
    }
    const handleEmailChange = (e) => {
        setemailState(e.target.value)
    }
    const handleDelete = () => {
        deleteMember(member.id)
    }
    const handleUpdate = () => {
        updateMember(member.id, nameState.name, emailState)
    }

    return (
        <li>
            <span>{member.name}</span>
            <input type="text" value={nameState.name} onChange={handleNameChange} name='name' />
            <span>{member.email}</span>
            <input type="text" value={emailState} onChange={handleEmailChange} email='email' />
            Active: {member.active}
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>X</button>
        </li>
    )
}
