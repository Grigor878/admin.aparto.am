import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import { logOut } from '../../svgs/svgs'
import userImg from '../../../assets/imgs/user.webp'
import { DisabledInput } from '../../components/inputs/DisabledInput'
import { BtnCustom } from '../../components/buttons/BtnCustom'
import { AddInput } from '../../components/inputs/AddInput'
import './Profile.scss'
import baseApi from '../../../apis/baseApi'
import { getAxiosConfig } from '../../../apis/config'

const Profile = () => {
    const dispatch = useDispatch()

    // let obj = {
    //     old:"",
    //     new:""
    // }

    const [retryError, setRetryError] = useState(null)

    const hanldeLogOut = () => {
        // localStorage.removeItem('persist:root')
        dispatch(logout())
    }

    const handlePassword = (e) => {
        e.preventDefault()
        let oldPassword = e.target.userOldPassword.value
        let newPassword = e.target.userNewPassword.value
        let retryPassword = e.target.userRetryPassword.value

        if (!oldPassword.length || !newPassword.length || !retryPassword.length) {
            setRetryError('Complete all fields!')
        } else if (oldPassword === newPassword && oldPassword === retryPassword) {
            setRetryError('There is no changes!')
        } else if (newPassword === retryPassword) {
            setRetryError(null)

            baseApi.post('/changePassword', { oldPassword, newPassword }, getAxiosConfig())
                .then(
                    response => {
                        console.log(response.data, 88);
                    })
            // console.log(`Old-${oldPassword}`)
            // console.log(`New-${newPassword}`)
            // console.log(`New Retry-${retryPassword}`)
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
                        <DisabledInput
                            name='Name'
                            value='Grig'
                        />
                        <DisabledInput
                            name='Role'
                            value='Admin'
                        />
                    </div>
                    <div className='profile__data-form-parts'>
                        <DisabledInput
                            name='Phone'
                            value='+37493898282'
                        />
                        <DisabledInput
                            name='Email'
                            value='grigsgog@gmail.com'
                        />
                    </div>
                </div>
            </div>

            <div className='profile__bottom'>
                {retryError ? <h3 style={{ color: 'red' }}>{retryError}</h3> : <h3>Change Password</h3>}
                <form onSubmit={handlePassword} autoComplete="off" className='profile__bottom-form'>
                    <AddInput
                        id='userOldPassword'
                        type='password'
                        placeholder='Password'
                        name='old'
                    />
                    <div className='profile__bottom-form-parts'>
                        <AddInput
                            id='userNewPassword'
                            type='password'
                            placeholder='Password'
                            name='new'
                        />
                        <AddInput
                            id='userRetryPassword'
                            type='password'
                            placeholder='Password'
                            name='retry'
                        />
                    </div>
                    <BtnCustom text="Change Password" />
                </form>
            </div>
        </article>
    )
}

export default Profile