import React from 'react'
import { Link } from 'react-router-dom'

export const List = () => {
    return (
        <div className="properties__list">
            <div className="properties__list-item">
                <div className='properties__list-slide'>
                    <p>Slide</p>
                </div>
                <div className='properties__list-info'>
                    {/* to={`edit/${row.id}`} */}
                    <Link to='edit'> Edit Page</Link>
                </div>
            </div>

            <div className="properties__list-item">
                <div className='properties__list-slide'>
                    <p>Slide</p>
                </div>
                <div className='properties__list-info'>
                    {/* to={`edit/${row.id}`} */}
                    <Link to='edit'> Edit Page</Link>
                </div>
            </div>
            
            <div className="properties__list-item">
                <div className='properties__list-slide'>
                    <p>Slide</p>
                </div>
                <div className='properties__list-info'>
                    {/* to={`edit/${row.id}`} */}
                    <Link to='edit'> Edit Page</Link>
                </div>
            </div>

            <div className="properties__list-item">
                <div className='properties__list-slide'>
                    <p>Slide</p>
                </div>
                <div className='properties__list-info'>
                    {/* to={`edit/${row.id}`} */}
                    <Link to='edit'> Edit Page</Link>
                </div>
            </div>

            <div className="properties__list-item">
                <div className='properties__list-slide'>
                    <p>Slide</p>
                </div>
                <div className='properties__list-info'>
                    {/* to={`edit/${row.id}`} */}
                    <Link to='edit'> Edit Page</Link>
                </div>
            </div>
        </div>
    )
}
