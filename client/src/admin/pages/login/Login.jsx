import React from 'react'
import './Login.scss'
import { LoginForm } from './components/form/LoginForm'

const Login = () => {
    return (
        <article className='login'>
            <h3>Login</h3>
            <LoginForm />
        </article>
    )
}

export default Login