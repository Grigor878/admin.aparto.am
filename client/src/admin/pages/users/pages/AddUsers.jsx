import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { AddInput } from '../../../components/inputs/AddInput'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
// import { useDispatch } from 'react-redux'
import { addUser } from '../../../../store/slices/usersSlice'
// import { addUser } from '../../../../store/slices/usersSlice'
import baseApi from '../../../../apis/baseApi'
// import choose from '../../../../assets/imgs/chooseAvatar.png'
import './Styles.scss'

const AddUsers = () => {
    const [avatar, setAvatar] = useState()
    const [role, setRole] = useState('')
    const [info, setInfo] = useState({})

    // const dispatch = useDispatch()

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
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
            phone: {
                tel1: info.user_tel1,
                tel2: info.user_tel2,
                viber: info.user_viber,
                whatsapp: info.user_whatsapp,
                telegram: info.user_telegram,
            },
            role: info.user_role,
        };

        const formData = new FormData()
        formData.append('file', avatar)
        formData.append('fileName', avatar.name)
        formData.append('userInfo', JSON.stringify(userInfo))

        baseApi.post('/api/addUser', formData)
            .then((response) => {
                console.log(response.data)
            })
        // dispatch(addUser({ formData }))
    }

    return (
        <article className='subUsers'>
            <AddPart type="addUsers" />
            <div className='subUsers__container'>
                <div className='subUsers__choose'>
                    {/* <img src={choose} alt="User" /> */}
                    <AddInput
                        id='user_avatar'
                        type='file'
                        name='Avatar'
                        onChange={handleAvatar} />
                </div>
                <form id="addUserForm" onSubmit={handleSubmit} className='subUsers__form'>
                    <SelectRole
                        role={role}
                        setRole={setRole}
                        onChange={handleChange}
                    />
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
                        <AddInput
                            id='user_tel1'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 1'
                            onChange={handleChange}
                        />
                        <AddInput
                            id='user_tel2'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 2'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='subUsers__form-parts'>
                        <AddInput
                            id='user_viber'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Viber'
                            onChange={handleChange}
                        />
                        <AddInput
                            id='user_whatsapp'
                            type='tel'
                            placeholder='Enter user phone'
                            name='WhatsApp'
                            onChange={handleChange}
                        />
                        <AddInput
                            id='user_telegram'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Telegram'
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </article>
    )
}

export default AddUsers