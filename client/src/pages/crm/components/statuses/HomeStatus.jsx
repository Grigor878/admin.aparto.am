import React from 'react'
import './styles.scss'

export const HomeStatus = ({ status }) => {
    return (
        status === "approved"
            ? <span className='homestatus_approved'>Ակտիվ</span>
            : status === "archived"
                ? <span className='homestatus_archived'>Արխիվացված</span>
                : status === "moderation"
                    ? <span className='homestatus_moderation'>Վերանայման</span>
                    : <span className='homestatus_deactive'>Ապաակտիվացված</span>
    )
}
