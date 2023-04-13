import React from 'react'
import { search } from '../../../../svgs/svgs'

export const Search = ({ value, onChange }) => {
    return (
        <label className="properties__searchbox-search">
            <span>
                {search.icon}
            </span>
            <input
                type='text'
                placeholder='Search by ID, Property Name, Phone, Owner or Agent'
                value={value}
                onChange={onChange}
                required
            />
        </label>
    )
}
