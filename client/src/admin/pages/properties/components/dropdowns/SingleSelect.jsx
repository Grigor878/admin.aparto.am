import React from 'react'
import '../../../../components/inputs/Inputs.scss'

export const SingleSelect = ({ title, id, value, onChange, data, style }) => {

    const handleOptionChange = (e) => {
        const selectedIndex = e.target.selectedIndex
        const selectedOption = data[selectedIndex]
        const optionName = selectedOption.getOptionName || ''
        onChange(optionName, e, id)
    }

    return (
        <label className='addproperties__card-singleselect'>
            {title}
            <select
                id={id}
                value={value}
                onChange={handleOptionChange}
                style={{ width: style }}
                className="addproperties__card-singleselect-dropdown"
            >
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
