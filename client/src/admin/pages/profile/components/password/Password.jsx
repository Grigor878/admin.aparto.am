import React, { useState } from 'react'
import { BtnCustom } from '../../../../components/buttons/BtnCustom'
import { AddInput } from '../../../../components/inputs/AddInput'
import baseApi from '../../../../../apis/baseApi'
import { getAxiosConfig } from '../../../../../apis/config'
import { error, success } from '../../../../../components/swal/swal'

export const Password = () => {
    const [retryError, setRetryError] = useState(null)

    const handlePassword = (e) => {
        e.preventDefault()
        let oldPassword = e.target.userOldPassword.value
        let newPassword = e.target.userNewPassword.value
        let retryPassword = e.target.userRetryPassword.value

        if (!oldPassword.length || !newPassword.length || !retryPassword.length) {
            setRetryError('Complete all fields!')
        } else if (oldPassword === newPassword && oldPassword === retryPassword) {
            setRetryError('There is no changes!')
        } else if (newPassword === retryPassword) {
            setRetryError(null)

            baseApi.post('/api/changePassword', { oldPassword, newPassword }, getAxiosConfig())
                .then(res => success(res.data.message))
                .catch(err => error(err.message))

            e.target.userOldPassword.value = ""
            e.target.userNewPassword.value = ""
            e.target.userRetryPassword.value = ""
        } else {
            setRetryError('Passwords are not same!')
        }
    }

    return (
        <div className='profile__bottom'>
            {retryError ? <h3 style={{ color: 'red' }}>{retryError}</h3> : <h3>Փոխել Ծածկագիրը</h3>}
            <form onSubmit={handlePassword} autoComplete="off" className='profile__bottom-form'>
                <AddInput
                    id='userOldPassword'
                    type='password'
                    placeholder='Password'
                    name='Հին ծածկագիրը'
                />
                <div className='profile__bottom-form-parts'>
                    <AddInput
                        id='userNewPassword'
                        type='password'
                        placeholder='Password'
                        name='նոր ծածկագիրը'
                    />
                    <AddInput
                        id='userRetryPassword'
                        type='password'
                        placeholder='Password'
                        name='կրկնեք նոր ծածկագիրը'
                    />
                </div>
                <BtnCustom text="Change Password" />
            </form>
        </div>
    )
}
