import React, { useState } from 'react'
import { BtnCustom } from '../../../../components/buttons/BtnCustom'
import { AddInput } from '../../../../components/inputs/AddInput'
import baseApi from '../../../../../apis/baseApi'
import { getAxiosConfig } from '../../../../../apis/config'
import { error, success } from '../../../../../components/swal/swal'

export const Password = () => {
    // const [retryError, setRetryError] = useState(null)

    const handlePassword = (e) => {
        e.preventDefault()
        let oldPassword = e.target.userOldPassword.value
        let newPassword = e.target.userNewPassword.value
        let retryPassword = e.target.userRetryPassword.value

        if (!oldPassword.length || !newPassword.length || !retryPassword.length) {
            // setRetryError('Complete all fields!')
            error('Complete all fields!');
        } else if (oldPassword === newPassword && oldPassword === retryPassword) {
            // setRetryError('There is no changes!')
            error('There is no changes!');
        } else if (newPassword === retryPassword) {
            // setRetryError(null)

            baseApi.post('/api/changePassword', { oldPassword, newPassword }, getAxiosConfig())
                .then(res => success(res.data.message))
                .catch(err => error(err.response.data.message))

            e.target.userOldPassword.value = ""
            e.target.userNewPassword.value = ""
            e.target.userRetryPassword.value = ""
        } else {
            // setRetryError('Passwords are not same!')
            error('Passwords are not same!')
        }
    }

    return (
        <div className='profile__bottom'>
            <h3>Փոխել Ծածկագիրը</h3>
            {/* {retryError ? <p style={{ color: 'red' }}>{retryError}</p> : null} */}
            <form onSubmit={handlePassword} autoComplete="off" className='profile__bottom-form'>
                <AddInput
                    id='userOldPassword'
                    type='password'
                    placeholder="Նվազագույնը 6 արժեք"
                    name='Հին ծածկագիրը'
                />
                <div className='profile__bottom-form-parts'>
                    <AddInput
                        id='userNewPassword'
                        type='password'
                        placeholder="Նվազագույնը 6 արժեք"
                        name='նոր ծածկագիրը'
                    />
                    <AddInput
                        id='userRetryPassword'
                        type='password'
                        placeholder="Նվազագույնը 6 արժեք"
                        name='կրկնեք նոր ծածկագիրը'
                    />
                </div>
                <BtnCustom text="ՓՈԽԵԼ ԾԱԾԿԱԳԻՐԸ" />
            </form>
        </div>
    )
}
