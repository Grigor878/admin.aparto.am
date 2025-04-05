import React from 'react'

export const SingleSelect = ({ title, onChange, value, data, style, required }) => {
    return (
        <label className='addproperties__card-singleselect'>
            {title}
            <select
                required={required}
                onChange={onChange}
                style={{ width: style }}
                className="addproperties__card-singleselect-dropdown"
            >
                {data?.map((el) => {
                    return (
                        <option
                            key={el.id}
                            value={el.value}
                            selected={el.value === value}//
                        >
                            {el.name}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}