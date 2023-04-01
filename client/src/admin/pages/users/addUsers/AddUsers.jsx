import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { BtnCustom } from '../../../components/buttons/BtnCustom'
import AddInput from '../../../components/inputs/AddInput'
import { isValidEmail } from '../../../../helpers/utils'
import { SelectRole } from '../../../components/dropdowns/SelectRole'
import './AddUsers.scss'

const AddUsers = () => {
    const [mailError, setMailError] = useState(null)

    const handleUserInfo = (e) => {
        e.preventDefault()
        let userName = e.target.userName?.value
        let userNameRu = e.target.userNameRu?.value
        let userNameEng = e.target.userNameEng?.value
        let userTel1 = e.target.userTel1?.value
        let userTel2 = e.target.userTel2?.value
        let userViber = e.target.userViber?.value
        let userWhatsApp = e.target.userWhatsApp?.value
        let userTelegram = e.target.userTelegram?.value
        let userMail = e.target.userMail?.value

        isValidEmail(userMail)

        if (!userName?.length || !userNameRu?.length || !userNameEng?.length || !userTel1?.length || !userMail?.length) {
            setMailError('Complete required fields!')
        } else if (!isValidEmail(userMail)) {
            setMailError('Email is invalid!')
        } else {
            setMailError(null)
            console.log(`Names-AM-${userName} RU-${userNameRu} GB-${userNameEng}`)
            console.log(`Phone 1-${userTel1}`)
            console.log(`Phone 2-${userTel2}`)
            console.log(`Viber-${userViber}`)
            console.log(`WhatsApp-${userWhatsApp}`)
            console.log(`Telegram-${userTelegram}`)
            console.log(`Email-${userMail}`)
            e.target.userName.value = ""
            e.target.userNameRu.value = ""
            e.target.userNameEng.value = ""
            e.target.userTel1.value = ""
            e.target.userTel2.value = ""
            e.target.userViber.value = ""
            e.target.userWhatsApp.value = ""
            e.target.userTelegram.value = ""
            e.target.userMail.value = ""
        }
    }

    return (
        <article className='addusers'>
            <AddPart type="add" />

            {mailError ? <h3 style={{ color: 'red' }}>{mailError}</h3> : null}

            <div>
                <form onSubmit={handleUserInfo} autoComplete="off" className='profile__data-form'>
                    <div className=''>
                        <AddInput
                            id='userName'
                            type='text'
                            placeholder='Enter user name'
                            name='Name'
                        />
                        <AddInput
                            id='userNameRu'
                            type='text'
                            placeholder='Enter user name'
                            name='Name RUS'
                        />
                        <AddInput
                            id='userNameEng'
                            type='text'
                            placeholder='Enter user name'
                            name='Name ENG'
                        />
                    </div>
                    <div className=''>
                        <AddInput
                            id='userMail'
                            type='email'
                            placeholder='Enter user email'
                            name='Email'
                        />
                        <SelectRole />
                        <AddInput
                            id='userTel1'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 1'
                        />
                        <AddInput
                            id='userTel2'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Phone 2'
                        />
                        <AddInput
                            id='userViber'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Viber'
                        />
                        <AddInput
                            id='userWhatsApp'
                            type='tel'
                            placeholder='Enter user phone'
                            name='WhatsApp'
                        />
                        <AddInput
                            id='userTelegram'
                            type='tel'
                            placeholder='Enter user phone'
                            name='Telegram'
                        />
                    </div>
                    <BtnCustom type="submit" text="Edit" />
                </form>
            </div>
        </article>
    )
}

export default AddUsers