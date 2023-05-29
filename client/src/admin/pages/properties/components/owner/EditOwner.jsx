import React, { useState } from 'react'
import { ownerAdd, remove } from '../../../../svgs/svgs'
import './Styles.scss'

export const EditOwner = ({ data, onChange }) => {
    // const [active, setActive] = useState(false)
    // const [activeTwo, setActiveTwo] = useState(false)

    return (
        <div className='editOwner'>
            <div className="editOwner__card">
                {data?.map(({ title, key, placeholder, style, value }) => {
                    return (
                        <label
                            className='addproperties__card-text'
                            key={key}
                        >
                            {title}
                            <input
                                id={key}
                                type="text"
                                placeholder={placeholder ? placeholder : "Ex."}
                                className='addproperties__card-text-full'
                                minLength="3"
                                style={{ width: style }}
                                onChange={onChange}
                                defaultValue={value}
                            />
                        </label>
                    )
                })}
            </div>

        </div>
    )
}
