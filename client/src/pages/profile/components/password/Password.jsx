import React from 'react'
import { BtnCustom } from '../../../../components/buttons/BtnCustom'
import { AddInput } from '../../../../components/inputs/AddInput'
import baseApi from '../../../../services/api/baseApi'
import { error, success } from '../../../../components/alerts/alerts'
import { getAxiosConfig } from '../../../../services/api/config'

export const Password = () => {
    const handlePassword = (e) => {
        e.preventDefault()
        let oldPassword = e.target.userOldPassword.value
        let newPassword = e.target.userNewPassword.value
        let retryPassword = e.target.userRetryPassword.value

        if (!oldPassword.length || !newPassword.length || !retryPassword.length) {
            error('Լրացրեք բոլոր դաշտերը!');
        } else if (oldPassword === newPassword && oldPassword === retryPassword) {
            error('Փոփոխություններ չկան!');
        } else if (newPassword === retryPassword) {

            baseApi.post('/api/changePassword', { oldPassword, newPassword }, getAxiosConfig())
                .then(res => success(res.data.message))
                .catch(err => error(err.response.data.message))

            e.target.userOldPassword.value = ""
            e.target.userNewPassword.value = ""
            e.target.userRetryPassword.value = ""
        } else {
            error('Կրկնության սխալ!')
        }
    }

    return (
        <div className='profile__bottom'>
            <h3>Փոխել Ծածկագիրը</h3>
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
