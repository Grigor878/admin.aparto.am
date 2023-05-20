import React, { useEffect, useState } from 'react';
import { file } from '../../../../svgs/svgs';
import { useDispatch } from 'react-redux';
import { setUploadFile } from '../../../../../store/slices/propertySlice';

export const FileUpload = () => {
    const [upload, setUpload] = useState([]);

    const uploadFile = (e) => {
        const files = Array.from(e.target.files);

        const uniqueFiles = files.filter((file) => {
            return !upload.some((uploadedFile) => uploadedFile.name === file.name);
        });

        setUpload((prevImages) => [...prevImages, ...uniqueFiles]);
    };

    const dispatch = useDispatch();

    const uploadFormData = () => {
        const formData = new FormData();
        upload.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
        dispatch(setUploadFile(formData));
    };

    useEffect(() => {
        uploadFormData();
    }, [upload]);

    return (
        <div className='addproperties__card-fileUpload'>
            <label className='addproperties__card-fileUpload-label'>
                {file.icon} <p>Կցել Փաստաթուղթ</p>
                <input
                    id='uploadFile'
                    type='file'
                    name='File'
                    onChange={uploadFile}
                    multiple
                    accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf'
                />
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {upload?.map(({ name }) => {
                    return <p key={name}>{name}</p>;
                })}
            </div>
        </div>
    );
};
