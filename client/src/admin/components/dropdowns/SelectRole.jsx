//https://react-select.com/home nayel package-y
import React from 'react'

export const SelectRole = ({ handleSelct }) => {
    return (
        <label className='dash__label'>
            Role
            <select name="role" id="role" className='dash__input' onChange={handleSelct} >
                <option value="" >Role</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="agent">Agent</option>
            </select>
        </label>
    )
}
