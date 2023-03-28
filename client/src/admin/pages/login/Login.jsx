import React from 'react'
import { useDispatch } from "react-redux";
import { login } from '../../../store/slices/authSlice'

const Login = () => {
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        let email = e.target.email.value;
        let password = e.target.password.value;
        dispatch(login({ email, password }))
        e.target.email.value = ""
        e.target.password.value = ""
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" id="email" />
                <input type="password" placeholder="Password" id="password" />
                <button type="submit">Log-In</button>
            </form>
        </div>
    )
}

export default Login