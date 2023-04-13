import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../../store/slices/authSlice'
import { logOut } from '../../../../svgs/svgs'
import userImg from '../../../../../assets/imgs/user.webp'
import { API_BASE_URL } from '../../../../../apis/config'
import { DisabledInput } from '../../../../components/inputs/DisabledInput'

export const Personal = () => {
    const dispatch = useDispatch()
    const { photo, full_name, role, phone, email } = useSelector((state => state.userGlobal.userGlobal))

    const hanldeLogOut = () => {
        dispatch(logout())
    }

    return (
        <>
            <div className='profile__top'>
                <h3>Personal Page</h3>
                <button onClick={hanldeLogOut} className='profile__top-logout'>
                    {logOut.icon}
                    <p >Log-Out</p>
                </button>
            </div>

            <div className='profile__data'>
                <div className='profile__data-userImg'>
                    {photo === null
                        ? <img src={userImg} alt="User" />
                        : <img src={API_BASE_URL + '/images/' + photo} alt="User" />
                    }
                </div>
                <div className='profile__data-form'>
                    <div className='profile__data-form-parts'>
                        <DisabledInput
                            name='Name'
                            value={full_name.en}
                        />
                        <DisabledInput
                            name='Role'
                            value={role}
                        />
                    </div>
                    <div className='profile__data-form-parts'>
                        <DisabledInput
                            name='Phone'
                            value={phone.tel1}
                        />
                        <DisabledInput
                            name='Email'
                            value={email}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
