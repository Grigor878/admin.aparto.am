import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormFields = ({ fields, onChange }) => {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
        const { id, value } = event.target;
        const newValues = { ...values, [id]: value };
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <div>
            {fields.map(({ id, type, label, defaultValue }) => (
                <div key={id}>
                    <label htmlFor={id}>{label}</label>
                    <br />
                    {type === 'inputEmail' ? (
                        <input
                            type="email"
                            id={id}
                            name={id}
                            value={values[id] || ''}
                            onChange={handleChange}
                        />
                    ) : type === 'inputPassword' ? (
                        <input
                            type="password"
                            id={id}
                            name={id}
                            value={values[id] || ''}
                            onChange={handleChange}
                        />
                    ) : (
                        <input
                            type="text"
                            id={id}
                            name={id}
                            value={values[id] || defaultValue || ''}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

FormFields.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['inputText', 'inputEmail', 'inputPassword']).isRequired,
            label: PropTypes.string.isRequired,
            defaultValue: PropTypes.string,
        }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default FormFields;
