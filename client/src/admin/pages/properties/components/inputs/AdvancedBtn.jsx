import React from 'react'
import { down, up } from '../../../../svgs/svgs'

export const AdvancedBtn = ({ onClick, status }) => {
    return (
        <button onClick={onClick} className="properties__searchbox-advancedBtn">
            Advanced Filters {status ? down.icon : up.icon}
        </button>
    )
}
