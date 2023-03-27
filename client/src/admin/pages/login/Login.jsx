import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { login } from '../../../store/slices/authSlice'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { isLoggedIn, token } = useSelector((state) => state.auth)

    const handleApi = (e) => {
        e.preventDefault()
        setEmail('')
        setPassword('')
        dispatch(login({ email, password }))
    }

    if (isLoggedIn && token) {
        return <Navigate to="/dashboard" replace />;
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