import React from 'react'
import { API_BASE_URL } from '../../../../apis/config'
import { remove, file } from '../../../svgs/svgs';
import { extractFileName } from '../../../../helpers/formatters';
// import './Styles.scss'

export const UploadFile = ({ page, files, handleUploadFile, removeFile }) => {
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
                            {page === "edit"
                                ? <p>{extractFileName(el)}</p>
                                : <p>{el.name || el}</p>
                            }
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
