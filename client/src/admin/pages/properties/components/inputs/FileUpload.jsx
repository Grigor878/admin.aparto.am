import React from 'react'
import { file } from '../../../../svgs/svgs'

export const FileUpload = ({ onChange }) => {
    return (
        <label className='addproperties__card-fileUpload'>
            {file.icon} <p>Կցել Փաստաթուղթ</p>
            <input
                type='file'
                name='File'
                onChange={onChange}
                multiple
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" />
        </label>
    )
}
