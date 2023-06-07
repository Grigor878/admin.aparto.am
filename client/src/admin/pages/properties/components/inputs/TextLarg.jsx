import React from 'react'

export const TextLarg = ({ title, id, placeholder, required, value, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <textarea
                id={id}
                required={required}
                placeholder={placeholder}
                className='addproperties__card-text-larg'
                value={value}
                onChange={onChange}
                rows="14"
                cols="10"
                wrap="soft"
            ></textarea>
        </label>
    )
}