import React, { useState } from 'react'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'
import { AddModal } from '../modal/AddModal'
import { remove } from '../../../../svgs/svgs'
import baseApi from '../../../../../apis/baseApi'
import { success } from '../../../../../components/swal/swal'

export const Card = ({ title, name, data, added, search }) => {
    const [active, setActive] = useState(true)

    active
        ? (document.body.style.overflow = "auto")
        : (document.body.style.overflow = "hidden")

    const postRemovedField = (key) => {
        let am = {
            name: name,
            id: key,
        }
        let ru = {
            name: name,
            id: key,
        }
        let en = {
            name: name,
            id: key,
        }
        const removedField = { am, en, ru }

        baseApi.post('/api/removeGlobalFormField', removedField)
        success('Field removed!')
        // window.location.reload(false)
    }

    return (
        <div className='structure__center-card' style={{ display: search }}>
            <h4>{title}</h4>
            <ul>
                <li>
                    <span>Անվանում</span>
                </li>
                {data?.map((el) => {
                    return (
                        <li key={el}>
                            <p>{el}</p>
                        </li>
                    )
                })}
                {/* Avelacvacnery */}
                {added.length
                    ? added.map((obj, index) => {
                        const key = Object.keys(obj)[0]
                        const value = obj[key]

                        return (
                            <>
                                <li
                                    key={key + index}
                                    style={{ display: 'flex', justifyContent: "space-between" }}
                                >
                                    <p>{value}</p>
                                    <button
                                        onClick={() => postRemovedField(key)}
                                    >{remove.icon}
                                    </button>
                                </li>
                            </>
                        );
                    }) 
                    : null}
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
