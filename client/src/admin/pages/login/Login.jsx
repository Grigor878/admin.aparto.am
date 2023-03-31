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
        <article className='login'>
            <h3>Login page</h3>
            <form onSubmit={handleLogin} autoComplete="off">
                <input type="email" placeholder="Email" id="email" autoComplete="new-password" />
                <input type="password" placeholder="Password" id="password" autoComplete="new-password" />
                <button type="submit">Log-In</button>
            </form>
        </article>
    )
}

export default Login