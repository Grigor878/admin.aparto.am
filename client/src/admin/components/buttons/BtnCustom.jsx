import React from 'react'
import './StyleBtn.scss'

//submiti pahy dzel
export const BtnCustom = ({ onClick, text, form }) => {
    return (
        <button type="submit" form={form} onClick={onClick} className='btn__add-this'>{text}</button>
    )
}

