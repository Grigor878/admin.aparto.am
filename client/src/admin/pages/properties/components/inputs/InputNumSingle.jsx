import React from 'react'

export const InputNumSingle = ({ id, title, placeholder, required, style, onChange, value }) => {
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
            <span>$</span>
        </label>
    )
}