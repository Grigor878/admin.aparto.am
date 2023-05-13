import React, { useState } from 'react'
import { file } from '../../../../svgs/svgs'
// import baseApi from '../../../../../apis/baseApi'

export const FileUpload = ({ id, onChange }) => {
    const [upload, setUpload] = useState([])

    const uploadFile = (e) => {
        const files = Array.from(e.target.files);
        setUpload((prevImages) => [...prevImages, ...files]);

        // onChange(e)
    }

    const uploadFormData = () => {
        const formData = new FormData();
        upload.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
        // baseApi.post('api/multyPhoto', formData);
    }

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
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" />
            </label>
            <button onClick={uploadFormData}>Send</button>
            {upload?.map(({ name }) => {
                return <p key={name}>{name}</p>
            })}
        </div>
    )
}
