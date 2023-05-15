import React, { useEffect, useState } from 'react'
import { file } from '../../../../svgs/svgs'
import { useDispatch } from 'react-redux'
import { setUploadFile } from '../../../../../store/slices/propertySlice'

export const FileUpload = () => {
    const [upload, setUpload] = useState([])

    const uploadFile = (e) => {
        const files = Array.from(e.target.files)
        setUpload((prevImages) => [...prevImages, ...files])
    }

    const dispatch = useDispatch()

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
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" />
            </label>
            {upload?.map(({ name }) => {
                return <p key={name}>{name}</p>
            })}
        </div>
    )
}
