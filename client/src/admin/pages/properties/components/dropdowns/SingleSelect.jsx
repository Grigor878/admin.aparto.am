import React from 'react'
import '../../../../components/inputs/Inputs.scss'

export const SingleSelect = ({ title, id, value, onChange, data }) => {
    return (
        <label className='addproperties__card-singleselect'>
            {title}
            <select id={id} value={value} onChange={onChange} className="addproperties__card-singleselect-dropdown">
                {data.map((el) => {
                    return (
                        <option
                            key={el.id}
                            value={el.value}
                        >{el.name}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}
