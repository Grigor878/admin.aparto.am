//https://react-select.com/home nayel package-y
import React from 'react'

export const SelectRole = () => {
    return (
        <select name="role" id="role" className='dash__input'>
            <option value="" >Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="agent">Agent</option>
        </select>
    )
}
