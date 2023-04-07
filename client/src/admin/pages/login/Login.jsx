import React from 'react'
import './Login.scss'
import { LoginForm } from './components/form/LoginForm'
// import baseApi from '../../../apis/baseApi'

const Login = () => {
    // baseApi.post("/api/signin")
    // .then(
    //     response => {
    //        console.log(response.data, 88);
    //     })

    return (
        <article className='login'>
            <h3>Login</h3>
            <LoginForm />
        </article>
    )
}

export default Login