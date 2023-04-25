import React from 'react'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'

export const Card = ({ title, data, onClick }) => {
    return (
        <div className='structure__center-card'>
            <h4>{title}</h4>
            <ul>
                <li>
                    <span>Անվանում</span>
                </li>
                {data.map(({ name }) => {
                    return (
                        <li key={name}><p>{name}</p></li>
                    )
                })}
            </ul>
            <div className='structure__center-card-btn'>
                <BtnAdd
                    onClick={onClick}
                // onClick={onClick}
                />
            </div>
        </div>
    )
}
