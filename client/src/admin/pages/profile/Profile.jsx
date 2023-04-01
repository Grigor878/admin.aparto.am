import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import { logOut } from '../../svgs/svgs'
import userImg from '../../../assets/imgs/user.webp'
import { DisabledText } from '../../components/inputs/DisabledText'
import { EditPassword } from '../../components/inputs/EditPassword'
import { BtnCustom } from '../../components/buttons/BtnCustom'
import './Profile.scss'

const Profile = () => {
    const dispatch = useDispatch()

    const [retryError, setRetryError] = useState(null)

    const hanldeLogOut = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        dispatch(logout())
        window.location.reload(false)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        let oldPassword = e.target.userOldPassword.value
        let newPassword = e.target.userNewPassword.value
        let retryPassword = e.target.userRetryPassword.value

        if (oldPassword.length === 0 || newPassword.length === 0 || retryPassword.length === 0) {
            setRetryError('Complete all fields!')
        } else if (oldPassword === newPassword && oldPassword === retryPassword) {
            setRetryError('There is no changes!')
        } else if (newPassword === retryPassword) {
            setRetryError(null)
            console.log(`Old-${oldPassword}`)
            console.log(`New-${newPassword}`)
            console.log(`New Retry-${retryPassword}`)
            e.target.userOldPassword.value = ""
            e.target.userNewPassword.value = ""
            e.target.userRetryPassword.value = ""
        } else {
            setRetryError('Passwords are not same!')
        }
    }

    return (
        <article className='profile'>
            <div className='profile__top'>
                <h3>Personal Page</h3>
                <button onClick={hanldeLogOut} className='profile__top-logout'>
                    {logOut.icon}
                    <p >Log-Out</p>
                </button>
            </div>

            <div className='profile__data'>
                <div className='profile__data-userImg'>
                    <img src={userImg} alt="User" />
                </div>
                <div className='profile__data-form'>
                    <div className='profile__data-form-parts'>
                        <DisabledText name="Name" value="Grig" />
                        <DisabledText name="Role" value="Admin" />
                    </div>
                    <div className='profile__data-form-parts'>
                        <DisabledText name="Phone" value="+37493898282" />
                        <DisabledText name="Email" value="grigsgog@gmail.com" />
                    </div>
                </div>
            </div>

            <div className='profile__bottom'>
                {retryError ? <h3 style={{ color: 'red' }}>{retryError}</h3> : <h3>Change Password</h3>}
                <form onSubmit={handlePassword} autoComplete="off" className='profile__bottom-form'>
                    <EditPassword id="userOldPassword" label="old" />
                    <div className='profile__bottom-form-parts'>
                        <EditPassword id="userNewPassword" label="new" />
                        <EditPassword id="userRetryPassword" label="retry" />
                    </div>
                    <BtnCustom text="Change Password" />
                </form>
            </div>
        </article>
    )
}

export default Profile