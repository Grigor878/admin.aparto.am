import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { AddInput } from '../../../components/inputs/AddInput'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
import choose from '../../../../assets/imgs/chooseAvatar.png'
import './Styles.scss'

const AddUsers = () => {
    const [info, setInfo] = useState({})
    //taza state ov modifikacnel es info-n

    const handleChange = (e) => {
        let { id, value } = e.target

        setInfo((prev) => {
            return { ...prev, [id]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(info)
    }
    //sarqel global erku ejeri hamar
    return (
        <article className='subUsers'>
            <AddPart type="addUsers" />
            <div className='subUsers__container'>
                <div className='subUsers__choose'>
                    <img src={choose} alt="User" />
                </div>
                <form id="myForm" onSubmit={handleSubmit} className='subUsers__form'>
                    <SelectRole />
                    <div className='subUsers__form-parts'>
                        <AddInput
                            id='user_name'
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
                            id='user_name_eng'
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
