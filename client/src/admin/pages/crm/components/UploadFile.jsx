import React, { useEffect } from 'react'
import { API_BASE_URL } from '../../../../apis/config'
import { remove, file } from '../../../svgs/svgs';
// import './Styles.scss'

export const UploadFile = ({ files, handleUploadFile, removeFile, uploadFormData }) => {
    useEffect(() => {
        uploadFormData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files])

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
                {files?.map((el) => {
                    const isFile = el instanceof File;

                    return (
                        <div key={el.name || el} style={{ display: 'flex', gap: '7px' }}>
                            <p>{el.name || el}</p>
                            <button
                                type='button'
                                onClick={() => removeFile(el)}
                                style={{ background: "transparent" }}
                            >{remove.icon}
                            </button>
                            {!isFile && <a style={{ fontSize: "14px", color: "#61636b" }} target='_blank' href={API_BASE_URL + `/files/` + el} rel="noreferrer">View</a>}
                        </div>
                    )
                })}
            </div>
        </div >
    );
};
