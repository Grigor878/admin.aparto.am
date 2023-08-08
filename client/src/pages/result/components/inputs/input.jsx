import React from 'react'

export const Input = ({ className, type, placeholder, onChange,symbol }) => {
    return (
        <label className={className}>
            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            <span>{symbol}</span>
        </label>
    )
}
