import React from 'react'
import '../../pages/Styles.scss'

export const Card = ({ title, child, width }) => {
    return (
        <div className='addproperties__card' style={{ width: width }}>
            <h2>{title}</h2>
            <div className='addproperties__card-block'>
                {child}
            </div>
        </div>
    )
}
