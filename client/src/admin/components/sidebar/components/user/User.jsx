import React from 'react'
import { userIcon, shevron } from '../../../../svgs/svgs'
import './User.scss'

const User = () => {
    return (
        <div className='user'>
            <div className='user__info'>
                {userIcon.icon}
                <div className='user__info-text'>
                    <p>Ruben K.</p>
                    <span>Admin</span>
                </div>
            </div>
            <button>{shevron.icon}</button>
        </div>
    )
}

export default User