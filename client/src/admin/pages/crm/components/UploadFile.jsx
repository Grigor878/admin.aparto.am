import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../../apis/config'
import { remove, file } from '../../../svgs/svgs';
import { extractFileName } from '../../../../helpers/formatters';
import { useDispatch } from 'react-redux';
import { setUploadFiles } from '../../../../store/slices/crmSlice';
// import './Styles.scss'

export const UploadFile = ({ files }) => {
    const [upload, setUpload] = useState(files ? files : [])

    const dispatch = useDispatch()

    const handleUploadFile = (e) => {
        const files = Array.from(e.target.files)

        const uniqueFiles = files.filter((file) => {
            return !upload.some((uploadedFile) => uploadedFile.name === file.name)
        });

        setUpload((prev) => [...prev, ...uniqueFiles])
    };

    const removeFile = (file) => {
        setUpload((prev) => prev.filter((uploadedFile) => uploadedFile !== file))
    }

    useEffect(() => {
        dispatch(setUploadFiles(upload))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upload])

    return (
        <div className='fileUpload'>
            <label className='fileUpload__label'>
                {file.icon} <p>Կցել Փաստաթուղթ</p>
                <input
                    id='uploadFile'
                    type='file'
                    name='File'
                    onChange={handleUploadFile}
                    multiple
                    accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf'
                />
            </label>
            <div style={{ display: 'flex', alignItems: "flex-end", flexDirection: 'column', gap: '4px' }}>
                {upload?.map((el) => {
                    const isFile = el instanceof File;

                    return (
                        <div key={el.name || el} style={{ display: 'flex', gap: '7px' }}>
                            <p>{el.name || extractFileName(el)}</p>
                            <button
                                type='button'
                                onClick={() => removeFile(el)}
                                style={{ background: "transparent" }}
                            >{remove.icon}
                            </button>
                            {!isFile && <a style={{ fontSize: "14px", color: "#61636b" }} target='_blank' href={API_BASE_URL + "/" + el} rel="noreferrer">View</a>}
                        </div>
                    )
                })}
            </div>
        </div >
    );
};
