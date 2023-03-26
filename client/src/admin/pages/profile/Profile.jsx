import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.scss'

const Profile = () => {
    const navigate = useNavigate()

    const hanldeLogOut = () => {
        localStorage.removeItem('auth')
        navigate('/login')
        window.location.reload(false)
    }

    return (
        <article className='profile'>
            <h1>Profile</h1>
            <button onClick={hanldeLogOut}>Log-Out</button>
        </article>
    )
}

export default Profile