import React from 'react'
import "./styles.scss"

export const Checkbox = ({ onChange, text }) => {
    return (
        <label className='checkbox'>
            <input type="checkbox" onChange={onChange} />
            <p>{text}</p>
        </label>
    )
}
