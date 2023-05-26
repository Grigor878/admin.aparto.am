import React from 'react'

export const InputText = ({ title, id, style, height, placeholder, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                required 
                type="text"
                placeholder={placeholder}
                className='addproperties__card-text-full'
                minLength="3"
                style={{ width: style, height: height }}
                onChange={onChange}
            />
        </label>
    )
}
