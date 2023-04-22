import React from 'react'
import { dollar } from '../../../../../assets/svgs/svgs'

export const InputSymbol = ({ id, placeholder, name, onChange }) => {
    return (
        <label className="properties__searchbox-form-inputSymbol">
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
            <p>
                {name === "price" ? dollar.icon : <span> m<sup>2</sup></span>}
            </p>
        </label>
    )
}
