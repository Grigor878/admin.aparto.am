import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getCommunityData } from '../../../../store/slices/viewSlice';

export const MultiSelect = ({ streets, community, placeholder, onChange }) => {
    const { language } = useSelector((state => state.home))
    console.log(streets)
    // console.log(community)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!streets.length) {
            dispatch(getCommunityData({ language, community }))
        }
    }, [dispatch, streets, language, community])

    const { streetData } = useSelector((state => state.view))

    const technologyList = streetData?.map(item => ({
        label: item[language],
        value: item.id
    }));

    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions?.map(option => option.value);
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
                    width: "100%",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "16px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    border: "1.5px solid  #9DA0A9",
                    background: "#F3F4F8",
                    boxShadow: "0px 4px 54px 0px rgba(200, 200, 208, 0.20)",
                    padding: "10px 20px"
                }),
            }}
        />
    );
};
