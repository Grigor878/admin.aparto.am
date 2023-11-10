import React from 'react'
import { search } from '../../svgs/svgs'
import './Inputs.scss'

export const Search = ({ value, placeholder, onChange, width }) => {
    return (
        <label className="dash__search" style={{ width: width }}>
            <span>
                {search.icon}
            </span>
            <input
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}
