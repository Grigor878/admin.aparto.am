import React from 'react'
import Select from 'react-select'
import { useMediaQuery } from 'react-responsive';

export const DropdownModified = ({ data, width, placeholder, onChange }) => {
    if (!data || typeof data !== 'object') {
        data = {}
    }

    let technologyList = [];

    Object.keys(data)?.map(key => {
        return technologyList.push({ label: data[key], value: data[key] })
    });

    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value)
        onChange(selectedValues)
    }

    const laptopSmall = useMediaQuery({ maxWidth: 1122 })
    const isMobile = useMediaQuery({ maxWidth: 768 })

    return (
        <Select
            isMulti
            closeMenuOnSelect={false}
            isClearable={false}
            options={technologyList}
            placeholder={placeholder}
            onChange={handleChange}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: width,
                    fontWeight: "400",
                    fontSize: laptopSmall ? "13px" : "16px",
                    textTransform: "capitalize",
                    lineHeight: "20px",
                    border: "none",
                    borderColor: 'transparent',
                    boxShadow: 'none',
                    background: "#fffff",
                    cursor: "pointer",
                    borderBottom: isMobile ? '1px solid #cfd1da' : 'none',
                }),
            }}
        />
    )
}
