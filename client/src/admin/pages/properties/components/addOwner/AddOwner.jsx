import React, { useState } from 'react'
import { ownerAdd, remove } from '../../../../svgs/svgs'
import './AddOwner.scss'

export const AddOwner = ({ data, onChange }) => {
    const [active, setActive] = useState(false)

    return (
        <div className='addOwner'>
            <button
                type='button'
                className={!active ? 'addOwner__addBtn' : 'addOwner__addBtnHidden'}
                onClick={() => setActive(true)}
            >
                {ownerAdd.icon}
                Ավելացնել սեփականատեր
            </button>

            <div className={active ? 'addOwner__labelsActive' : 'addOwner__labels'}>
                <button
                    type='button'
                    className='addOwner__labelsActive-remove'
                    onClick={() => setActive(false)}
                >
                    {remove.icon}
                    Հեռացնել
                </button>
                {data?.map(({ id, title, key, placeholder, style }) => {
                    return (
                        <label
                            className='addproperties__card-text'
                            key={key}
                        >
                            {title}
                            <input
                                id={id}
                                type="text"
                                placeholder={placeholder ? placeholder : "Ex."}
                                className='addproperties__card-text-full'
                                minLength="3"
                                style={{ width: style }}
                                // onChange={()=>console.log(key)}
                                onChange={onChange}
                            />
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
