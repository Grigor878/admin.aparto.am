import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
import { EditInput } from '../../../components/inputs/EditInput'
import choose from '../../../../assets/imgs/chooseAvatar.png'
import baseApi from '../../../../apis/baseApi'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { splitAfter } from '../../../../helpers/formatters'
import './Styles.scss'

const EditUsers = () => {
    const [avatar, setAvatar] = useState()
    const [role, setRole] = useState('')
    const [info, setInfo] = useState({})

    const users = useSelector((state => state.user))
    const location = useLocation()
    let path = location.pathname.slice(location.pathname.lastIndexOf("/"), location.pathname.length);
    const userId = Number(splitAfter(path))

    const currentUser = users.users.find(item => item.id === userId)
    console.log(currentUser)//

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

        console.log(userInfo)//

        const formData = new FormData()
        formData.append('file', avatar)
        formData.append('fileName', avatar.name)
        formData.append('userInfo', JSON.stringify(userInfo))

        baseApi.post('/api/editUser', formData)
            .then((response) => {
                console.log(response.data);
            });
    }

    return (
        <article className='subUsers'>
            <AddPart type="editUser" />
            <div className="subUsers__container">
                <div className='subUsers__choose'>
                    <img src={choose} alt="User" />
                    {/* <EditInput
                        id='user_avatar'
                        type='file'
                        name='Avatar'
                        onChange={handleAvatar} /> */}
                </div>
                <form id="editUserForm" onSubmit={handleSubmit} className='subUsers__form'>
                    <SelectRole
                        role={role}
                        setRole={setRole}
                        onChange={handleChange}
                        value={currentUser.role}
                    />
                    <div className='subUsers__form-parts'>
                        <EditInput
                            id='user_name_am'
                            type='text'
                            placeholder='Enter user name'
                            name='Name'
                            onChange={handleChange}
                            value={currentUser.full_name.am}
                        />
                        <EditInput
                            id='user_name_ru'
                            type='text'
                            placeholder='Enter user name'
                            name='Name RUS'
                            onChange={handleChange}
                            value={currentUser.full_name.ru}
                        />
                        <EditInput
                            id='user_name_en'
                            type='text'
                            placeholder='Enter user name'
                            name='Name ENG'
                            onChange={handleChange}
                            value={currentUser.full_name.en}
                        />
                    </div>
                    <div className='subUsers__form-parts'>
                        <EditInput
                            id='user_mail'
                            type='email'
                            placeholder='Enter user email'
                            name='Email'
                            onChange={handleChange}
                            value={currentUser.email}
                        />
                        <EditInput
                            id='user_tel1'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 1'
                            onChange={handleChange}
                            value={currentUser.phone.tel1}
                        />
                        <EditInput
                            id='user_tel2'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 2'
                            onChange={handleChange}
                            value={currentUser.phone.tel2}
                        />
                    </div>
                    <div className='subUsers__form-parts'>
                        <EditInput
                            id='user_viber'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Viber'
                            onChange={handleChange}
                            value={currentUser.phone.viber}
                        />
                        <EditInput
                            id='user_whatsapp'
                            type='tel'
                            placeholder='Enter user phone'
                            name='WhatsApp'
                            onChange={handleChange}
                            value={currentUser.phone.whatsapp}
                        />
                        <EditInput
                            id='user_telegram'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Telegram'
                            onChange={handleChange}
                            value={currentUser.phone.telegram}
                        />
                    </div>
                    {/* <BtnCustom type="submit" text="Add This User" /> */}
                </form>
            </div>
        </article>
    )
}

export default EditUsers