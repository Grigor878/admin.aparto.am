import React from 'react'
import Select from 'react-select'

export const DropdownModified = ({ data, width, placeholder, onChange }) => {

    let technologyList = [];
    data?.forEach(function (element) {
        technologyList.push({ label: element, value: element })
    })

    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value)
        onChange(selectedValues);
    }

    return (
        <Select
            isMulti
            closeMenuOnSelect={false}
            options={technologyList}
            placeholder={placeholder}
            onChange={handleChange}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    width: width,
                    fontWeight: "400",
                    fontSize: "16px",
                    textTransform: "capitalize",
                    lineHeight: "20px",
                    borderColor: 'transparent',
                    boxShadow: 'none',
                    background: "#fffff",
                    cursor: "pointer"
                }),
            }}
        />
    )
}
