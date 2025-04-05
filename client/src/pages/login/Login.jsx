import React from 'react'
import { LoginForm } from './components/form/LoginForm'
import { useSelector } from 'react-redux'
import { Loader } from '../../components/loader/Loader'
import './Login.scss'

const Login = () => {
    const { loading } = useSelector(state => state.auth)

    return (
        <article className='login' >
            {loading
                ? <Loader />
                : <>
                    <h3>Մուտք</h3>
                    <LoginForm />
                </>}
        </article >
    )
}

export default Login