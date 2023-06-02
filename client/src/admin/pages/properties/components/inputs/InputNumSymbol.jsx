import React from 'react'

export const InputNumSymbol = ({ id, data, title, value, onChange, style, required }) => {
    return (
        <label className='addproperties__card-text' id={id}>
            {title}
            <div style={{ display: "flex", gap: "12px" }}>
                {data?.map((el) => {

                    if (value) {
                        var currentValue = value[el.id] || value;
                    }

                    return (
                        <div key={el.id}>
                            <input
                                id={el.id}
                                required={required}
                                min={0}
                                type="number"
                                placeholder={el.name}
                                className='addproperties__card-text-price'
                                style={{ width: style }}
                                onChange={onChange}
                                defaultValue={currentValue}
                            />
                            <span>{el.symbol}</span>
                        </div>
                    )
                })}
            </div>
        </label>
    )
}
