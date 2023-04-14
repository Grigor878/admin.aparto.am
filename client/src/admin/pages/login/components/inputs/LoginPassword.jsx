import React from 'react'

export const LoginPassword = ({ id }) => {
    return (
        <input
            id={id}
            type="password"
            placeholder="Password"
            name="password"
            className="dash__input"
            autoComplete="new-password"
        />
    )
}
