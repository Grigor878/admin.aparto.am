import React from 'react'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'

export const Card = ({ title, data }) => {
    return (
        <div className='structure__center-card'>
            <h4>{title}</h4>
            <ul>
                <li>
                    <span>Name</span>
                </li>
                {data.map(({ id, name }) => {
                    return (
                        <li key={id}><p>{name}</p></li>
                    )
                })}
            </ul>
            <div className='structure__center-card-btn'>
                <BtnAdd
                    onClick={() => alert("Added!")}
                // onClick={onClick}
                />
            </div>
        </div>
    )
}
