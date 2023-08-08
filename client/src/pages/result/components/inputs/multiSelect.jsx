import React from 'react';
import Select from 'react-select';

export const MultiSelect = ({ data, placeholder, onChange }) => {
    if (!Array.isArray(data)) {
        data = [];
    }

    const technologyList = data.map(item => ({
        label: item.am,
        value: item.id
    }));

    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        onChange(selectedValues);
    };

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
                    width:"100%",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "16px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    border: "1.5px solid  #9DA0A9",
                    background: "#F3F4F8",
                    boxShadow: "0px 4px 54px 0px rgba(200, 200, 208, 0.20)",
                    padding:"10px 20px"
                }),
            }}
        />
    );
};
