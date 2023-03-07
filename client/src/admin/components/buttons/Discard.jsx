import React from 'react'
import './StyleBtn.scss'

const Discard = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className='btn__discard'>{text}</button>
    )
}

export default Discard