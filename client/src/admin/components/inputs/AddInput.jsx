import React from 'react'
import './Inputs.scss'

export const AddInput = ({ id, type, placeholder, name }) => {
    return (
        <label className='dash__label'>
            {type === 'tel'
                ? name + ' (+374)' : type === 'password'
                    ? name + ' password' : name}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                className="dash__input"
                minLength={type === 'text'
                    ? "3"
                    : null}
                pattern={type === 'tel'
                    ? "[\\+]374(4[134]|55|77|88|9[134689])\\d{6}"
                    : null}
            />
        </label>
    )
}

