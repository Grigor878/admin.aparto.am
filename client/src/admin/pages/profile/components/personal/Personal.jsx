import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../../store/slices/authSlice'
import { logOut } from '../../../../svgs/svgs'
import userImg from '../../../../../assets/imgs/user.webp'
import { API_BASE_URL } from '../../../../../apis/config'
import { DisabledInput } from '../../../../components/inputs/DisabledInput'

export const Personal = () => {
    const dispatch = useDispatch()
    const userGlobal = useSelector((state => state.userGlobal))
    const userInfo = userGlobal.userGlobal
    console.log(userInfo)

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
                    {userInfo?.photo === null
                        ? <img src={userImg} alt="User" />
                        : <img src={API_BASE_URL + '/images/' + userInfo?.photo} alt="User" />
                    }
                </div>
                <div className='profile__data-form'>
                    <div className='profile__data-form-parts'>
                        <DisabledInput
                            name='Name'
                            value={userInfo?.full_name?.en}
                        />
                        <DisabledInput
                            name='Role'
                            value={userInfo?.role}
                        />
                    </div>
                    <div className='profile__data-form-parts'>
                        <DisabledInput
                            name='Phone'
                            value={userInfo?.phone?.tel1}
                        />
                        <DisabledInput
                            name='Email'
                            value={userInfo?.email}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
