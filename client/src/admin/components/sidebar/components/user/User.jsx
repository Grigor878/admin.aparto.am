import React from 'react'
import { Link } from 'react-router-dom'
import { userIcon, shevron } from '../../../../svgs/svgs'
import './User.scss'

const User = () => {
    return (
        <Link to='/dashboard/profile' className='user'>
            <div className='user__info'>
                {userIcon.icon}
                <div className='user__info-text'>
                    <p>Ruben K.</p>
                    <span>Admin</span>
                </div>
            </div>
            {shevron.icon}
        </Link>
    )
}

export default User