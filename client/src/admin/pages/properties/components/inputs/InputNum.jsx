import React from 'react'

export const InputNum = ({ title, value, id, placeholder, onChange, style, required }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                defaultValue={value ? value : null}
                required={required}
                min={0}
                type="number"
                placeholder={placeholder}
                className='addproperties__card-text-hug'
                style={{ width: style }}
                onChange={onChange}
            />
        </label>
    )
}
