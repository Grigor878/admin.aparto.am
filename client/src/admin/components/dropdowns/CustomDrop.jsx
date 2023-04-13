import React from 'react'

export const CustomDrop = ({ value, onChange, data }) => {
    return (
        <select value={value} onChange={onChange} className="properties__searchbox-dropdown">
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
