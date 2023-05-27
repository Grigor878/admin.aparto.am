import React from 'react'

export const TextLarg = ({ title, id, placeholder, required, value, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                required={required}
                type="text"
                placeholder={placeholder}
                className='addproperties__card-text-larg'
                minLength="3"
                value={value}
                onChange={onChange}
            />
        </label>
    )
}