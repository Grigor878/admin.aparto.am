import React from 'react'

export const InputNumSymbol = ({ id, data, title, onChange, style, required }) => {
    return (
        <label className='addproperties__card-text' id={id}>
            {title}
            <div style={{ display: "flex", gap: "12px" }}>
                {data.map((el) => {
                    return (
                        <div key={el.id}>
                            <input
                                id={el.id}
                                required={required}
                                type="number"
                                placeholder={el.name}
                                className='addproperties__card-text-price'
                                minLength="3"
                                style={{ width: style }}
                                onChange={onChange}
                            />
                            {/* <span>{el.symbol}</span> */}
                        </div>
                    )
                })}
            </div>
        </label>
    )
}
