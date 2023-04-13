import React from 'react'
import { down, up } from '../../../../svgs/svgs'

export const BtnAdvanced = ({ onClick, status }) => {
    return (
        <button onClick={onClick} className="properties__searchbox-advanced">
            Advanced Filters {status ? down.icon : up.icon}
        </button>
    )
}
