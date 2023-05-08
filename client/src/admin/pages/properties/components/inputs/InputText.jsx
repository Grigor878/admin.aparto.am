import React from 'react'

export const InputText = ({ title, id, placeholder, style, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                className='addproperties__card-text-full'
                minLength="3"
                style={{ width: style }}
                onChange={onChange}
            />
        </label>
    )
}
