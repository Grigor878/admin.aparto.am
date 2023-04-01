import React from 'react'
import './Inputs.scss'

export const DisabledText = ({ name, value }) => {
    return (
        <label className='disabled__label'>
            {name}
            <input
                id="text"
                type="text"
                defaultValue={value}
                name={name}
                disabled
                className="disabled__input"
            />
        </label>
    )
}