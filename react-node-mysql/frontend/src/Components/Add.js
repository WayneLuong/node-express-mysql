import React, { useState } from 'react'
import axios from 'axios'

export default function Add() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        axios.post(`http://localhost:5000/api/members/add?name=${name}&email=${email}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' value={name} placeholder='Name' onChange={handleNameChange} />
                <input type="text" name='email' value={email} placeholder='Email' onChange={handleEmailChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
