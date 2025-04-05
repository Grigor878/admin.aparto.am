import React from 'react'

export const Text = ({ title, placeholder, required, value, onChange }) => {
    return (
        <label className='cardText'>
            {title}
            <textarea
                required={required}
                placeholder={placeholder}
                className='cardText-larg'
                defaultValue={value}
                onChange={onChange}
                rows="14"
                cols="10"
                wrap="soft"
            ></textarea>
        </label>
    )
}