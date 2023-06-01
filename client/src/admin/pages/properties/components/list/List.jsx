import React from 'react'
import {  useSelector } from 'react-redux'
import { Loader } from '../../../../../components/loader/Loader'
import { Link } from 'react-router-dom'

export const List = () => {
    const { propertyData } = useSelector((state) => state.property)

    return (
        <div className="properties__list">
            {!propertyData
                ? <Loader />
                : propertyData?.map(({ id, selectedTransationType, }) => {
                    return (
                        <div key={id} className="properties__list-item">
                            <div className='properties__list-slide'>
                                <p>ID - {id}</p>
                                <p>Type - {selectedTransationType}</p>
                            </div>
                            <div className='properties__list-info'>
                                <Link to={`edit/${id}`}> Edit Page</Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
