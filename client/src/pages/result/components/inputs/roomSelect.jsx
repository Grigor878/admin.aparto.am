import React from 'react'
import './styles.scss'

export const RoomSelect = ({ data, onChange, rooms }) => {
    return (
        <div className='roomsSelector'>
            {data?.map((el) => (
                <button
                    type="button"
                    key={el.value}
                    id={el.label}
                    value={el.value}
                    onClick={() => onChange(el.value)}
                    className='roomsSelector__btn'
                    style={{ backgroundColor: rooms === el.value ? "#cfd1da" : "#f3f4f8" }}
                >
                    {el.value}
                </button>
            ))}
        </div>
    )
}
