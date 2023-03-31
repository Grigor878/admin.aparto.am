import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import { logOut } from '../../svgs/svgs'
import { isValidEmail } from '../../../helpers/utils'
import userImg from '../../../assets/imgs/user.webp'
import { BtnCustom } from '../../components/buttons/BtnCustom'
import { InputMail } from '../../components/inputs/InputMail'
import { InputPassword } from '../../components/inputs/InputPassword'
import { InputText } from '../../components/inputs/InputText'
import { InputTel } from '../../components/inputs/InputTel'
import './Profile.scss'

const Profile = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [mailError, setMailError] = useState(null)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [tel, setTel] = useState('+374')
    const [retryError, setRetryError] = useState(null)

    const hanldeLogOut = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        dispatch(logout())
    }

    const handleMail = (e) => {

        isValidEmail(email)

        if (!isValidEmail(e.target.value)) {
            setMailError('Email is invalid!')
        } else {
            setMailError(null)
        }
        setEmail(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleRole = (e) => {
        setRole(e.target.value)
    }

    const handleTel = (e) => {
        setTel(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        let oldPassword = e.target.old.value
        let newPassword = e.target.new.value
        let retryPassword = e.target.retry.value

        if (oldPassword === newPassword && oldPassword === retryPassword) {
            setRetryError('There is no changes!')

        } else if (newPassword === retryPassword) {
            setRetryError(null)
            // console.log(`Old-${oldPassword}`)
            // console.log(`New-${newPassword}`)
            // console.log(`New Retry-${retryPassword}`)
            e.target.old.value = ""
            e.target.new.value = ""
            e.target.retry.value = ""
        } else {
            setRetryError('Passwords are not same!')
        }
    }

    return (
        <article className='profile'>
            <div className='profile__top'>
                {mailError && email.length !== 0 ? <h3 style={{ color: 'red' }}>{mailError}</h3> : <h3>Personal Page</h3>}
                <button onClick={hanldeLogOut} className='profile__top-logout'>
                    {logOut.icon}
                    <p >Log-Out</p>
                </button>
            </div>

            <div className='profile__data'>
                <div className='profile__data-userImg'>
                    <img src={userImg} alt="User" />
                </div>
                <form autoComplete="off" className='profile__data-form'>
                    <div className='profile__data-form-parts'>
                        <InputText value={name} onChange={handleName} placeholder="Name" id='name' />
                        <InputText value={role} onChange={handleRole} placeholder="Role" id='role' />
                    </div>

                    <div className='profile__data-form-parts'>
                        <InputTel value={tel} onChange={handleTel} placeholder="Phone" />
                        <InputMail value={email} onChange={handleMail} />
                    </div>
                </form>
            </div>

            <div className='profile__bottom'>
                {retryError ? <h3 style={{ color: 'red' }}>{retryError}</h3> : <h3>Change Password</h3>}
                <form onSubmit={handleChangePassword} autoComplete="off" className='profile__bottom-form'>
                    <InputPassword id="old" />

                    <div className='profile__bottom-form-parts'>
                        <InputPassword id="new" />
                        <InputPassword id="retry" />
                    </div>

                    <BtnCustom text="Change Password" />
                </form>
            </div>
        </article>
    )
}

export default Profile