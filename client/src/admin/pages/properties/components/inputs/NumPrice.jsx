import React from 'react'

export const NumPrice = ({ title, id, placeholder, onChange, ex }) => {
    return (
        <label className='addproperties__card-text'>
            {title}
            <input
                id={id}
                type="number"
                placeholder={placeholder}
                className='addproperties__card-text-price'
                minLength="3"
                onChange={onChange}
            />
            <span>{ex}</span>
        </label>
    )
}
