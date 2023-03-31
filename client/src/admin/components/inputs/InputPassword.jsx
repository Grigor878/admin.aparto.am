import React from 'react'
import './StyleInput.scss'

export const InputPassword = ({ id }) => {
    return (
        <label className='dash__label-password'>
            {id} Password
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
