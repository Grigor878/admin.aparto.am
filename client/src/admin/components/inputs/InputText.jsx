import React from 'react'
import './StyleInput.scss'

export const InputText = ({ id, placeholder, value, onChange }) => {
    return (
        <label className='dash__label'>
            {placeholder}
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                name="name"
                minLength="3"
                value={value}
                onChange={onChange}
                className="dash__input"
            />
        </label>
    )
}
