import React from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";

export const Dropdown = ({
  data,
  width,
  placeholder,
  onChange,
  isMulti = true,
}) => {
  //   const handleChange = (selectedOptions) => {
  //     const selectedValues = selectedOptions.map((option) => option.value);
  //     onChange(selectedValues);
  //   };

  const handleChange = (selectedOptions) => {
    const selectedValues = isMulti
      ? selectedOptions?.map((option) => option.value) || []
      : selectedOptions
      ? [selectedOptions.value]
      : [];
    onChange(selectedValues);
  };

  const laptopSmall = useMediaQuery({ maxWidth: 1122 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Select
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      isClearable={!isMulti}
      // closeMenuOnSelect={false}
      //   isClearable={false}
      options={data}
      placeholder={placeholder}
      onChange={handleChange}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          width: width,
          fontWeight: "400",
          fontSize: laptopSmall ? "13px" : "16px",
          textTransform: "capitalize",
          lineHeight: "20px",
          border: "none",
          borderColor: "transparent",
          boxShadow: "none",
          background: "#fffff",
          cursor: "pointer",
          borderBottom: isMobile ? "1px solid #cfd1da" : "none",
        }),
        clearIndicator: (baseStyles) => ({
          ...baseStyles,
          display: "flex",
          color: "black",
          cursor: "pointer",
          transform: "scale(0.8)",
          padding: "0 8px 0 0 !important",
        }),
      }}
    />
  );
};
