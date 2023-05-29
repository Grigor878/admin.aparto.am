import React, { useEffect, useState } from 'react';
import { file, remove } from '../../../../svgs/svgs';
import { useDispatch } from 'react-redux';
import { setUploadFile } from '../../../../../store/slices/propertySlice';

export const FileUpload = ({ value }) => {
    const [upload, setUpload] = useState(value ? value : [])

    const dispatch = useDispatch()

    const uploadFile = (e) => {
        const files = Array.from(e.target.files)

        const uniqueFiles = files.filter((file) => {
            return !upload.some((uploadedFile) => uploadedFile.name === file.name)
        });

        setUpload((prevImages) => [...prevImages, ...uniqueFiles])
    };

    const removeFile = (file) => {
        setUpload((prevImages) => prevImages.filter((uploadedFile) => uploadedFile !== file))
    }

    // const downloadFile = (file) => {
    //     const url = URL.createObjectURL(file);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = file || 'download';
    //     link.click();
    // }

    const uploadFormData = () => {
        const formData = new FormData()
        upload.forEach((file, index) => {
            formData.append(`file${index}`, file)
        })
        dispatch(setUploadFile(formData))
    }

    useEffect(() => {
        uploadFormData()
    }, [upload])

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
            <div style={{ display: 'flex', alignItems: "flex-end", flexDirection: 'column', gap: '4px' }}>
                {upload?.map((el) => {
                    return (
                        <div key={el.name || el} style={{ display: 'flex', gap: '7px' }}>
                            <p>{el.name || el}</p>
                            <button
                                type='button'
                                onClick={() => removeFile(el)}
                                style={{ background: "transparent" }}
                            >{remove.icon}
                            </button>
                            <a target='_blank' href={`http://127.0.0.1:8000/files/` + el} rel="noreferrer">View</a>
                        </div>
                    )
                })}
            </div>
        </div >
    );
};
