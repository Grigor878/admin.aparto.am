import React from 'react'
import AddPart from '../../../components/addPart/AddPart'
import './Styles.scss'

const EditProperties = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('clicked')
    }

    return (
        <article className='editproperties'>
            <AddPart type="editProperties" />

            <form id="editPropertiesForm" onSubmit={handleSubmit}></form>
        </article>
    )
}

export default EditProperties