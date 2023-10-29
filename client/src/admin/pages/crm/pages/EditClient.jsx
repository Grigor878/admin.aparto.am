import React from 'react'
import AddPart from '../../../components/addPart/AddPart'

const EditClient = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Crm edit")
    }

    return (
        <article>
            <AddPart type="editClient" />

            <form
                id="editClientForm"
                onSubmit={handleSubmit}
            >

            </form>
        </article>
    )
}

export default EditClient