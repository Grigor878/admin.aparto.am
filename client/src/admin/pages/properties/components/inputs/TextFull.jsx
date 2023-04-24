import React from 'react'

export const TextFull = ({ title, id, placeholder, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}*
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                // name={name}
                className='addproperties__card-text-full'
                minLength="3"
                onChange={onChange}
            />
        </label>
    )
}