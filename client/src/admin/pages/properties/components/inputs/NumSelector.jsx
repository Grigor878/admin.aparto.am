import React, { useState } from 'react'

export const NumSelector = ({ id, title, data, value, style, onChange }) => {
    const [state, setState] = useState(null)
    value = id + state

    return (
        <label className='addproperties__card-text' style={{ width: style }}>
            {title}
            <div style={{ display: "flex", gap: "4px" }}>
                {data?.map((el) => (
                    <button
                        type="button"
                        key={el.value}
                        id={el.id}
                        value={el.value}
                        onClick={(e) => { onChange(e); setState(el.value) }}
                        className='addproperties__card-text-numSelector'
                        style={{ backgroundColor: state === el.value ? "#cfd1da" : "#f3f4f8" }}
                    >
                        {el.name}
                    </button>
                ))}
            </div>
        </label>
    )
}
