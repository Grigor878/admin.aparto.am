import React, { useState } from 'react'
import { BtnCustom } from '../../../../components/buttons/BtnCustom'
import { AddInput } from '../../../../components/inputs/AddInput'
import baseApi from '../../../../../apis/baseApi'
import { getAxiosConfig } from '../../../../../apis/config'

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
                .then(response => {
                    console.log(response.data);
                }).catch(err => {
                    console.log(err.message);
                })

            e.target.userOldPassword.value = ""
            e.target.userNewPassword.value = ""
            e.target.userRetryPassword.value = ""
        } else {
            setRetryError('Passwords are not same!')
        }
    }

    return (
        <div className='profile__bottom'>
            {retryError ? <h3 style={{ color: 'red' }}>{retryError}</h3> : <h3>Change Password</h3>}
            <form onSubmit={handlePassword} autoComplete="off" className='profile__bottom-form'>
                <AddInput
                    id='userOldPassword'
                    type='password'
                    placeholder='Password'
                    name='old'
                />
                <div className='profile__bottom-form-parts'>
                    <AddInput
                        id='userNewPassword'
                        type='password'
                        placeholder='Password'
                        name='new'
                    />
                    <AddInput
                        id='userRetryPassword'
                        type='password'
                        placeholder='Password'
                        name='retry'
                    />
                </div>
                <BtnCustom text="Change Password" />
            </form>
        </div>
    )
}
