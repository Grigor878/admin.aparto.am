import React from 'react'
import './StyleBtn.scss'

export const BtnCustom = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className='btn__add-this'>{text}</button>
    )
}

