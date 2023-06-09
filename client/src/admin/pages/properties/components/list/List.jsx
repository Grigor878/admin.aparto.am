import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../../../../../components/loader/Loader'
import { Link } from 'react-router-dom'
import './List.scss'

export const List = () => {
    const { propertyData, filteredData } = useSelector((state) => state.property)

    return (
        <div className="propertyList">
            {!propertyData && !filteredData
                ? <Loader />
                : filteredData === null
                    ? propertyData?.map(({ id, selectedTransationType, }) => {
                        return (
                            <div key={id} className="propertyList__item">
                                <div className='propertyList__slide'>
                                    <p>ID - {id}</p>
                                    <p>Type - {selectedTransationType}</p>
                                </div>
                                <div className='propertyList__info'>
                                    <Link to={`edit/${id}`}> Edit Page</Link>
                                </div>
                            </div>
                        )
                    })
                    : filteredData?.map(({ id, selectedTransationType, }) => {
                        return (
                            <div key={id} className="propertyList__item">
                                <div className='propertyList__slide'>
                                    <p>ID - {id}</p>
                                    <p>Type - {selectedTransationType}</p>
                                </div>
                                <div className='propertyList__info'>
                                    <Link to={`edit/${id}`}> Edit Page</Link>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}
