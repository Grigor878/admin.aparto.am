import React from 'react'

export const InputNumHidden = ({ title, value, id, placeholder, onChange, style, required }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                defaultValue={value ? value : null}
                required={required}
                type="number"
                placeholder={placeholder}
                className='addproperties__card-text-hug'
                style={{ width: style }}
                minLength="3"
                onChange={onChange}
            />
        </label>
    )
}
