import React from 'react'
import './StyleInput.scss'

export const InputMail = ({ value, onChange }) => {
    return (
        <label className='dash__label'>
            Email
            <input
                id="email"
                type="mail"
                placeholder="Email"
                name="email"
                value={value}
                onChange={onChange}
                className="dash__input"
            // autoComplete="new-password"
            />
        </label>
    )
}
