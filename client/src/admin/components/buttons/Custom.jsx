import React from 'react'
import './StyleBtn.scss'

const Custom = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className='btn__add-this'>{text}</button>
    )
}

export default Custom