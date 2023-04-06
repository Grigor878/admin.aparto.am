import React from 'react'
import AddPart from '../../../components/addPart/AddPart'
import './Styles.scss'

const EditUsers = () => {
    return (
        <article className='subUsers'>
            <AddPart type="Edit" />
            <div className="subUsers__container">

            </div>
        </article>
    )
}

export default EditUsers