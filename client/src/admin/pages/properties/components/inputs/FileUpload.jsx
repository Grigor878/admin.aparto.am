import React, { useState } from 'react'
import { file } from '../../../../svgs/svgs'

export const FileUpload = ({ onChange }) => {
    const [upload, setUpload] = useState([])

    const uploadFile = (e) => {
        setUpload(Object.values(e.target.files))
        
        // let newArray = Object.values(upload)
        // console.log(newArray?.map(el => el.name))
        
        onChange(e)
    }
    
    // console.log(upload)//

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
            {upload?.map(({ name }) => {
                return <p key={name}>{name}</p>
            })}
        </div>
    )
}
