import React from 'react'
import Select from 'react-select'

export const EditSelect = ({ title, data, value, style, onChange }) => {
    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions?.map((option) => option.value)
        const e = {
            target: {
                value: selectedValues,
            },
        }
        onChange(e)
    }

    return (
        <label className='addproperties__card-singleselect'>
            {title}
            <Select
                isMulti
                defaultValue={data?.filter((option) => value?.includes(option?.value))}
                closeMenuOnSelect={false}
                isClearable={false}
                options={data}
                placeholder="Ընտրեք"
                onChange={handleChange}
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        width: style,
                        borderRadius: "8px",
                        fontWeight: "400",
                        fontSize: "14px",
                        textTransform: "capitalize",
                        lineHeight: "16px",
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