import React from 'react'

export const Drowpdown = ({ value, onChange, data }) => {
    return (
        <select value={value} onChange={onChange} className="dash__input-dropdown">
            {data.map((el) => {
                return (
                    <option
                        key={el.name}
                        value={el.value}
                    // disabled={el.value === "" ? true : false}
                    >{el.name}
                    </option>
                )
            })}
        </select>
    )
}
