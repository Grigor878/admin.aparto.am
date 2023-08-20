import React from 'react';
import './styles.scss';
import { bedroomsNum, roomsNum } from '../../../home/components/search/data';

export const RoomSelect = ({ language, onChange, selectedRooms = [] }) => {
    const handleRoomClick = (value) => {
        const updatedSelectedRooms = selectedRooms?.includes(value)
            ? selectedRooms?.filter(room => room !== value)
            : [...selectedRooms, value];
        onChange(updatedSelectedRooms);
    };

    const roomData = language === "en" ? bedroomsNum : roomsNum;

    return (
        <div className='roomsSelector'>
            {roomData?.map((el) => (
                <button
                    type="button"
                    key={el.value}
                    id={el.label}
                    value={el.value}
                    onClick={() => handleRoomClick(el.value)}
                    className='roomsSelector__btn'
                    style={{
                        backgroundColor: selectedRooms?.includes(el.value) ? "#cfd1da" : "#f3f4f8",
                    }}
                >
                    {el.value}
                </button>
            ))}
        </div>
    );
};
