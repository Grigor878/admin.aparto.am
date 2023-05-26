import React from 'react'

export const InputNum = ({ title, id, placeholder, onChange, style }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                required 
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
