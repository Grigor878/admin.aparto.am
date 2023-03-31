import React from 'react'
import './StyleInput.scss'

export const InputTel = ({ placeholder, value, onChange }) => {
    return (
        <label className='dash__label'>
            {placeholder}
            <input
                id="phone"
                type="tel"
                placeholder={placeholder}
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={value}
                onChange={onChange}
                className="dash__input"
            />
        </label>
    )
}