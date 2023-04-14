import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userIcon, shevron } from '../../../../svgs/svgs'
import { API_BASE_URL } from '../../../../../apis/config'
import { capitalize } from '../../../../../helpers/formatters'
import './User.scss'

const User = () => {
    const userInfo = useSelector((state => state.userGlobal.userGlobal))

    return (
        <Link to='/dashboard/profile' className='user'>
            <div className='user__info'>
                {userInfo.photo === null
                    ? userIcon.icon
                    : <img src={API_BASE_URL + '/images/' + userInfo.photo} alt="User" />
                }
                <div className='user__info-text'>
                    <p>{
                        userInfo.full_name?.en.split(' ')[0]
                        + " " +
                        userInfo.full_name?.en.split(' ')[1][0]
                        + "."
                    }</p>
                    <span>{
                        userInfo.role !== undefined
                            ? capitalize(userInfo.role)
                            : <></>
                    }</span>
                </div>
            </div>
            {shevron.icon}
        </Link>
    )
}
export default User