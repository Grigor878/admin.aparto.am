import React from 'react'
import '../inputs/Inputs.scss'

export const Drowpdown = ({ id, value, onChange, data }) => {
    return (
        <select id={id} value={value} onChange={onChange} className="dash__input-dropdown">
            {data.map((el) => {
                return (
                    <option
                        // sra het id data um avelacnel
                        // disabled={el.id === 1 ? "disabled" : null}
                        key={el.name} //el.id
                        value={el.value}
                    >
                        {el.name}
                    </option>
                )
            })}
        </select>
    )
}
