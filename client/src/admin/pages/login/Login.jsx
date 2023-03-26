import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { API_BASE_URL } from '../../../config'


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleApi = () => {
        // console.log({ email, password })
        axios.post(API_BASE_URL + "/api/signin", {
            email: email,
            password: password
        })
            .then(res => {
                // console.log(res.data, 88)
                localStorage.setItem('auth', true)
                localStorage.setItem('authUser', res.data.access_token)
                navigate('/dashboard')
                window.location.reload(false)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div>
            <h1>Login page</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleApi}>Log-In</button>
        </div>
    )
}

export default Login