import React, { useState } from 'react'
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export const MultiSelect = ({ title, id, name, data, style }) => {
    const [selected, setSelected] = useState()

    // const mod = Object.assign([
    //     {
    //         name: name,
    //         key: id,
    //     },
    //     selected
    // ])
    // console.log(mod)


    return (
        <label className='addproperties__card-singleselect' >
            {title}
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={options}
                placeholder="Ընտրեք"
                onChange={(e) => setSelected(e)}
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        width: style,
                        borderColor: '#e7e9f0',
                        '&:hover': {
                            borderColor: '#e7e9f0',
                        },
                        boxShadow: 'none',
                        background: "#f3f4f8",
                        cursor: "pointer"
                    }),
                }}

            />
        </ label>
    )
}
