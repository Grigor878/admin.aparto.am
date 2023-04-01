import React from 'react'
import './Inputs.scss'

export const EditPassword = ({ label, id }) => {
    return (
        <label className='dash__label'>
            {label} Password
            <input
                id={id}
                type="password"
                placeholder="Password"
                name="password"
                className="dash__input"
            // autoComplete="new-password"
            />
        </label>
    )
}
