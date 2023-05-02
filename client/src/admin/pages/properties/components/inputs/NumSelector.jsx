import React from 'react'

export const NumSelector = ({data, title, state, setState }) => {

    return (
        <label className='addproperties__card-text'>
            {title}
            <div style={{ display: "flex", gap: "4px" }}>
                {data?.map((number) => (
                    <button
                        key={number}
                        onClick={() => setState(number)}
                        className='addproperties__card-text-numSelector'
                        style={{ backgroundColor: state === number ? "#cfd1da" : "#f3f4f8" }}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </label>
    )
}
