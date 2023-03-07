import React from 'react'
import { add } from '../../svgs/svgs'
import './StyleBtn.scss'

const Add = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className='btn__add'>
            {add.icon}
            <span> Add {text}</span>
        </button>
    )
}

export default Add