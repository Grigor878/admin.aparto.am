import React, { useState } from 'react'

export const NumSelector = ({ id, title, data, value, style }) => {

    const [state, setState] = useState(null)
    value = id + state
    // console.log(value)//

    return (
        <label className='addproperties__card-text' style={{ width: style }}>
            {title}
            <div style={{ display: "flex", gap: "4px" }}>
                {data?.map((el) => (
                    <button
                        key={el.id}
                        onClick={() => setState(el.value)} //addProp dnel
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
