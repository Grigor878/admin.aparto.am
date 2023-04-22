import React from 'react'

export const TextArea = ({ title, id, placeholder, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}*
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                // name={name}
                className='addproperties__card-text-input'
                minLength="3"
                required="false"
                onChange={onChange}
            />
        </label>
    )
}