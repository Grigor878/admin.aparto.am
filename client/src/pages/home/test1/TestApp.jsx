import React, { useState } from 'react';
import FormFields from './FormFields';

const TestApp = () => {
    const [formValues, setFormValues] = useState({});

    const handleFormChange = (newValues) => {
        setFormValues(newValues);
    };

    const handleSubmit = () => {
        // Do something with formValues
        console.log(formValues);
    };

    const isFormValid = Object.values(formValues).every((value) => value !== '');

    return (
        <div>
            <h1>Form Example</h1>
            <FormFields fields={fields} onChange={handleFormChange} />
            <button disabled={!isFormValid} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

const fields = [
    {
        id: 'first_name',
        type: 'inputText',
        label: 'First Name',
        defaultValue: 'Some first name',
    },
    {
        id: 'last_name',
        type: 'inputText',
        label: 'Last Name',
    },
    {
        id: 'email',
        type: 'inputEmail',
        label: 'Email',
    },
    {
        id: 'password',
        type: 'inputPassword',
        label: 'Password',
    },
];

export default TestApp;
