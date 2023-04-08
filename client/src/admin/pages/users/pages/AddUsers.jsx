import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { AddInput } from '../../../components/inputs/AddInput'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
// import choose from '../../../../assets/imgs/chooseAvatar.png'
import './Styles.scss'
import baseApi from '../../../../apis/baseApi'

const AddUsers = () => {
    const [avatar, setAvatar] = useState()
    const [role, setRole] = useState('')
    const [info, setInfo] = useState({})

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
    }

    const handleSelct = (e) => {
        setRole(e.target.value)
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
            role: role,
        };

        const formData = new FormData()
        formData.append('file', avatar)
        formData.append('fileName', avatar.name)
        // formData.append('userInfo', final)
        const result = { formData, userInfo }
        console.log(result);
        baseApi.post('/api/addUser', result)
            .then((response) => {
                console.log(response.data);
            });
    }

    //sarqel global erku ejeri hamar
    return (
        <article className='subUsers'>
            <AddPart type="addUsers" />
            <div className='subUsers__container'>
                <div className='subUsers__choose'>
                    {/* <img src={choose} alt="User" /> */}
                    <AddInput
                        id='user_avatar'
                        type='file'
                        // placeholder='Enter user name'
                        name='Avatar'
                        onChange={handleAvatar} />
                </div>
                <form id="myForm" onSubmit={handleSubmit} className='subUsers__form'>
                    <SelectRole
                        role={role}
                        setRole={setRole}
                        handleSelct={handleSelct}
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
                    {/* <BtnCustom type="submit" text="Add This User" /> */}
                </form>
            </div>
        </article>
    )
}

export default AddUsers





// import { isValidEmail } from '../../../../helpers/utils'

// const [mailError, setMailError] = useState(null)

// const handleUserInfo = (e) => {
//     e.preventDefault()
//     let userName = e.target.userName.value
//     let userNameRu = e.target.userNameRu.value
//     let userNameEng = e.target.userNameEng.value
//     let userTel1 = e.target.userTel1.value
//     let userTel2 = e.target.userTel2.value
//     let userViber = e.target.userViber.value
//     let userWhatsApp = e.target.userWhatsApp.value
//     let userTelegram = e.target.userTelegram.value
//     let userMail = e.target.userMail.value

//     isValidEmail(userMail)

//     if (!userName.length || !userNameRu.length || !userNameEng.length || !userTel1.length || !userMail.length) {
//         setMailError('Complete required fields!')
//     } else if (!isValidEmail(userMail)) {
//         setMailError('Email is invalid!')
//     } else {
//         setMailError(null)
//         console.log(`Names-AM-${userName} RU-${userNameRu} GB-${userNameEng}`)
//         console.log(`Phone 1-${userTel1}`)
//         console.log(`Phone 2-${userTel2}`)
//         console.log(`Viber-${userViber}`)
//         console.log(`WhatsApp-${userWhatsApp}`)
//         console.log(`Telegram-${userTelegram}`)
//         console.log(`Email-${userMail}`)
//         e.target.userName.value = ""
//         e.target.userNameRu.value = ""
//         e.target.userNameEng.value = ""
//         e.target.userTel1.value = ""
//         e.target.userTel2.value = ""
//         e.target.userViber.value = ""
//         e.target.userWhatsApp.value = ""
//         e.target.userTelegram.value = ""
//         e.target.userMail.value = ""
//     }
// }

// {/* {mailError ? <h3 style={{ color: 'red' }}>{mailError}</h3> : null} */ }
