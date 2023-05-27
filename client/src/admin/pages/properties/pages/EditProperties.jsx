import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertyData } from '../../../../store/slices/propertySlice'
import AddPart from '../../../components/addPart/AddPart'
import './Styles.scss'

const EditProperties = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPropertyData())
    }, [dispatch])

    const { propertyData } = useSelector((state) => state.property)
    console.log(propertyData)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('clicked')
    }

    return (
        <article className='editproperties'>
            <AddPart type="editProperties" />

            <form id="editPropertiesForm" onSubmit={handleSubmit}>
              
            </form>
        </article>
    )
}

export default EditProperties