import React, { useState } from 'react'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'
import { AddModal } from '../modal/AddModal'
import { random } from '../../../../../helpers/utils'

export const Card = ({ title, data, name, search }) => {
    const [active, setActive] = useState(true)

    active
        ? (document.body.style.overflow = "auto")
        : (document.body.style.overflow = "hidden")

    return (
        <div className='structure__center-card' style={{ display: search }}>
            <h4>{title}</h4>
            <ul>
                <li>
                    <span>Անվանում</span>
                </li>
                {data?.map((el) => {
                    return (
                        <li key={random(99999)}><p>{el.name}</p></li>
                    )
                })}
            </ul>
            <div className='structure__center-card-btn'>
                <BtnAdd onClick={() => setActive(false)} />
            </div>
            <AddModal
                name={name}
                title={title}
                active={active}
                setActive={setActive}
            />
        </div>
    )
}
