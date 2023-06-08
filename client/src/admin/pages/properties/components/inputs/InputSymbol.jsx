import React from 'react'
import { dollar } from '../../../../../assets/svgs/svgs'

export const InputSymbol = ({ id, placeholder, name, onChange, width }) => {
    return (
        <label className="properties__searchbox-form-inputSymbol">
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                style={{ width: width }}
            />
            {name === "price" ? <p>{dollar.icon}</p> : <p>ք.մ.</p>}
        </label>
    )
}
