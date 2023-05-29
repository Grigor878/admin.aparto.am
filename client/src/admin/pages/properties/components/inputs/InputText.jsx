import React from 'react'

export const InputText = ({ title, value, id, style, required, height, placeholder, onChange }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                defaultValue={value ? value : null}
                required={required}
                type="text"
                placeholder={placeholder}
                className='addproperties__card-text-full'
                style={{ width: style, height: height }}
                onChange={onChange}
            />
        </label>
    )
}
