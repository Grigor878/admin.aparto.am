import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import './Profile.scss'

const Profile = () => {
    const dispatch = useDispatch()

    const hanldeLogOut = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        dispatch(logout())
        // traquma dash ic login zerov greluc heto logout - 99% auth ica
    }

    return (
        <article className='profile'>
            <h1>Profile</h1>
            <button onClick={hanldeLogOut}>Log-Out</button>
        </article>
    )
}

export default Profile