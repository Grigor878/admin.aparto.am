import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../../admin/svgs/svgs'
import { logout } from '../../../../store/slices/authSlice'
import { clearUserGlobal } from '../../../../store/slices/userGlobalSlice'
import { clearUsers } from '../../../../store/slices/usersSlice'
import userImg from '../../../../assets/imgs/user.png'
import { DisabledInput } from '../../../../components/inputs/DisabledInput'
import { API_BASE_URL } from '../../../../services/api/config'

export const Personal = () => {
    const dispatch = useDispatch()

    const { userGlobal } = useSelector((state => state.userGlobal))

    const hanldeLogOut = () => {
        dispatch(clearUserGlobal())
        dispatch(clearUsers())
        dispatch(logout())
    }

    return (
        <>
            <div className='profile__top'>
                <h3>Անձնական Էջ</h3>
                <button onClick={hanldeLogOut} className='profile__top-logout'>
                    {logOut.icon}
                    <p>Դուրս Գալ Համակարգից</p>
                </button>
            </div>

            <div className='profile__data'>
                <div className='profile__data-userImg'>
                    {userGlobal?.photo === null
                        ? <img src={userImg} alt="User" />
                        : <img src={API_BASE_URL + '/images/' + userGlobal?.photo} alt="User" />
                    }
                </div>
                <div className='profile__data-form'>
                    <div className='profile__data-form-parts'>
                        <DisabledInput
                            name='ԱՆուն'
                            value={userGlobal?.full_name?.en}
                        />
                        <DisabledInput
                            name='հաստիք'
                            value={userGlobal?.role}
                        />
                    </div>
                    <div className='profile__data-form-parts'>
                        {userGlobal?.phone?.tel1?.length
                            ? <DisabledInput
                                name='Հեռախոսահամար'
                                value={userGlobal?.phone?.tel1}
                            />
                            : null}
                        <DisabledInput
                            name='էլ. Փոստ'
                            value={userGlobal?.email}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
