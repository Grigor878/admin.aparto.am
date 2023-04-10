import React from 'react'
import './Login.scss'
import { LoginForm } from './components/form/LoginForm'
// import axios from 'axios'
// import { API_BASE_URL } from '../../../apis/config'

const Login = () => {
    
    // axios.post(API_BASE_URL + "/api/signin")
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