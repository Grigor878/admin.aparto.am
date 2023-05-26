import React from 'react'
// import '../../../../components/inputs/Inputs.scss'

export const SingleSelect = ({ title, id, onChange, data, style }) => {
    return (
        <label className='addproperties__card-singleselect'>
            {title}
            <select
                id={id}
                required
                onChange={onChange}
                style={{ width: style }}
                className="addproperties__card-singleselect-dropdown"
            >
                {data.map((el) => {
                    return (
                        <option
                            key={el.id}
                            value={el.getOptionName}
                        >{el.name}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}
