import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
import { EditInput } from '../../../components/inputs/EditInput'
import userImg from '../../../../assets/imgs/user.webp'
// import choose from '../../../../assets/imgs/chooseAvatar.png'
import baseApi from '../../../../apis/baseApi'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../../../apis/config'
import './Styles.scss'

const EditUsers = () => {
    const params = useParams()
    const userId = Number(params.id)

    const users = useSelector((state => state.user.users))
    const currentUser = users.find(item => item.id === userId)

    const [avatar, setAvatar] = useState()
    const [role, setRole] = useState('')
    const [am, setAm] = useState(currentUser.full_name.am)
    const [ru, setRu] = useState(currentUser.full_name.ru)
    const [en, setEn] = useState(currentUser.full_name.en)
    const [email, setEmail] = useState(currentUser.email)
    const [tel1, setTel1] = useState(currentUser.phone.tel1)
    const [tel2, setTel2] = useState(currentUser.phone.tel2)
    const [viber, setViber] = useState(currentUser.phone.viber)
    const [whatsapp, setWhatsapp] = useState(currentUser.phone.whatsapp)
    const [telegram, setTelegram] = useState(currentUser.phone.telegram)

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
    }
    const handleRole = (e) => {
        setRole(e.target.value)
    }
    const handleAm = (e) => {
        setAm(e.target.value)
    }
    const handleRu = (e) => {
        setRu(e.target.value)
    }
    const handleEn = (e) => {
        setEn(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleTel1 = (e) => {
        setTel1(e.target.value)
    }
    const handleTel2 = (e) => {
        setTel2(e.target.value)
    }
    const handleViber = (e) => {
        setViber(e.target.value)
    }
    const handleWhatsapp = (e) => {
        setWhatsapp(e.target.value)
    }
    const handleTelegram = (e) => {
        setTelegram(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        // formData.append('file', avatar)
        // formData.append('fileName', avatar.name)
        // formData.append('userEditedInfo', JSON.stringify(userInfo))

        let userInfo = {
            full_name: {
                am: am,
                ru: ru,
                en: en,
            },
            email: email,
            phone: {
                tel1: tel1,
                tel2: tel2,
                viber: viber,
                whatsapp: whatsapp,
                telegram: telegram,
            },
            role: role,
        }
        // console.log("test", userInfo)


        // baseApi.post('/api/editUser', formData)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
    };


    const changeStatus = () => {
        let statusChangeInfo = {
            id: userId,
            status: "deactivated"
        }
        
        baseApi.post('/api/changeStatus', statusChangeInfo)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message))
    }

    return (
        <article className='subUsers'>
            <AddPart type="editUser" onClick={changeStatus} />
            <div className="subUsers__container">
                <div className='subUsers__choose'>
                    {currentUser.photo === null
                        ? <img src={userImg} alt="User" />
                        : <img src={API_BASE_URL + '/images/' + currentUser.photo} alt="User" />
                    }
                    {/* <EditInput
                        id='user_avatar'
                        type='file'
                        name='Avatar'
                        onChange={handleAvatar}
                    /> */}
                </div>
                <form id="editUserForm" onSubmit={handleSubmit} className='subUsers__form'>
                    <SelectRole
                        role={role}
                        setRole={setRole}
                        onChange={handleRole}
                        value={role}
                    />
                    <div className='subUsers__form-parts'>
                        <EditInput
                            id='User_name_am'
                            type='text'
                            placeholder='Enter user name'
                            name='Name'
                            onChange={handleAm}
                            value={am}
                        />
                        <EditInput
                            id='User_name_ru'
                            type='text'
                            placeholder='Enter user name'
                            name='Name RUS'
                            onChange={handleRu}
                            value={ru}
                        />
                        <EditInput
                            id='User_name_en'
                            type='text'
                            placeholder='Enter user name'
                            name='Name ENG'
                            onChange={handleEn}
                            value={en}
                        />
                    </div>
                    <div className='subUsers__form-parts'>
                        <EditInput
                            id='User_mail'
                            type='email'
                            placeholder='Enter user email'
                            name='Email'
                            onChange={handleEmail}
                            value={email}
                        />
                        <EditInput
                            id='User_tel1'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 1'
                            onChange={handleTel1}
                            value={tel1}
                        />
                        <EditInput
                            id='User_tel2'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 2'
                            onChange={handleTel2}
                            value={tel2}
                        />
                    </div>
                    <div className='subUsers__form-parts'>
                        <EditInput
                            id='User_viber'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Viber'
                            onChange={handleViber}
                            value={viber}
                        />
                        <EditInput
                            id='User_whatsapp'
                            type='tel'
                            placeholder='Enter user phone'
                            name='WhatsApp'
                            onChange={handleWhatsapp}
                            value={whatsapp}
                        />
                        <EditInput
                            id='User_telegram'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Telegram'
                            onChange={handleTelegram}
                            value={telegram}
                        />
                    </div>
                </form>
            </div>
        </article>
    )
}

export default EditUsers