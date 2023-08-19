import React from 'react'
import "./styles.scss"

export const Checkbox = ({ onChange, text, checked }) => {
    return (
        <label className='checkbox'>
            <input type="checkbox" onChange={onChange} checked={checked} />
            <p>{text}</p>
        </label>
    )
}
