import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddPart from '../../../components/addPart/AddPart'
import { ImgUpload } from '../../../components/inputs/ImgUpload'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AddInput } from '../../../components/inputs/AddInput'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
import baseApi from '../../../../apis/baseApi'
import { error, goodJob } from '../../../../components/swal/swal'
import './Styles.scss'

const AddUsers = () => {
    const [avatar, setAvatar] = useState()
    const [avatarUrl, setAvatarUrl] = useState([])
    const [role, setRole] = useState('')
    const [info, setInfo] = useState({})

    const navigate = useNavigate()

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])

        let selectedAvatar = e.target.files
        let selectedArray = Array.from(selectedAvatar)

        setAvatarUrl(selectedArray.map((file) => {
            return URL.createObjectURL(file)
        }))
    }

    const handleChange = (e) => {
        let { id, value } = e.target

        setInfo((prev) => {
            return { ...prev, [id]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let userInfo = {
            full_name: {
                am: info.user_name_am,
                ru: info.user_name_ru,
                en: info.user_name_en,
            },
            email: info.user_mail,
            role: info.user_role,
        };

        const formData = new FormData()
        formData.append('file', avatar)
        formData.append('fileName', avatar.name)
        formData.append('userInfo', JSON.stringify(userInfo))

        baseApi.post('/api/addUser', formData)
            .then(res => {
                goodJob(`Password is - ${res.data.password}`)
                navigate(-1)
            })
            .catch(err => error(err.message))

    }

    return (
        <article className='subUsers'>
            <AddPart type="addUsers" />
            <div className='subUsers__container'>
                <div className='subUsers__choose'>
                    {avatarUrl.length === 0
                        ? <ImgUpload onChange={handleAvatar} />
                        : avatarUrl.map((img, index) => {
                            return (
                                <div key={index} className='subUsers__uploaded'>
                                    <img src={img} alt="Uploaded Avatar" />
                                    <button
                                        onClick={() => setAvatarUrl(avatarUrl.filter((e) => e !== img))}
                                    ><RiDeleteBin5Fill /></button>
                                </div>
                            )
                        })
                    }
                </div>
                <form id="addUserForm" onSubmit={handleSubmit} className='subUsers__form'>
                    <div className='subUsers__form-parts'>
                        <AddInput
                            id='user_name_am'
                            type='text'
                            placeholder='Enter user name'
                            name='Name'
                            onChange={handleChange}
                        />
                        <AddInput
                            id='user_name_ru'
                            type='text'
                            placeholder='Enter user name'
                            name='Name RUS'
                            onChange={handleChange}
                        />
                        <AddInput
                            id='user_name_en'
                            type='text'
                            placeholder='Enter user name'
                            name='Name ENG'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='subUsers__form-parts'>
                        <AddInput
                            id='user_mail'
                            type='email'
                            placeholder='Enter user email'
                            name='Email'
                            onChange={handleChange}
                        />
                        <SelectRole
                            role={role}
                            setRole={setRole}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </article>
    )
}

export default AddUsers