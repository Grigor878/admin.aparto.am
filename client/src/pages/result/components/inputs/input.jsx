import React from 'react'

export const Input = ({ className, type, placeholder, onChange, value, symbol }) => {
    return (
        <label className={className}>
            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value={value}
            />
            <span>{symbol}</span>
        </label>
    )
}
