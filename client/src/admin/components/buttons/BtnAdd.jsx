import React from 'react'
import { add } from '../../svgs/svgs'
import './StyleBtn.scss'

export const BtnAdd = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className='btn__add'>
            {add.icon}
            <span>{!text ? "Ավելացնել" : text}</span>
            {/* <span>Ավելացնել {text}</span> */}
            {/* <span>Add {text}</span> */}
        </button>
    )
}
