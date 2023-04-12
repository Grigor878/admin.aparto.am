import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userIcon, shevron } from '../../../../svgs/svgs'
import { API_BASE_URL } from '../../../../../apis/config'
import { capitalize } from '../../../../../helpers/formatters'
import './User.scss'

const User = () => {
    const userInfo = useSelector((state => state.userGlobal.userGlobal))

    let [first, last] = userInfo.full_name.en.split(' ')
    const lastIndex = last[0]

    return (
        <Link to='/dashboard/profile' className='user'>
            <div className='user__info'>
                {userInfo.photo === null
                    ? userIcon.icon
                    : <img src={API_BASE_URL + '/images/' + userInfo.photo} alt="User" />
                }

                <div className='user__info-text'>
                    <p>{first + " " + lastIndex + "."}</p>
                    <span>{capitalize(userInfo.role)}</span>
                </div>
            </div>
            {shevron.icon}
        </Link>
    )
}

export default User