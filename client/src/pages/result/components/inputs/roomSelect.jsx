import React from 'react';
import { bedroomsNum, roomsNum } from '../../../home/components/search/data';
import './styles.scss';

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
                    {el.label}
                </button>
            ))}
        </div>
    );
};


// import React from 'react';
// import { roomData } from '../../../home/components/search/data';
// import './styles.scss';

// export const RoomSelect = ({ language, onChange, selectedRooms = [] }) => {
//     const handleRoomClick = (value) => {
//         const updatedSelectedRooms = selectedRooms.includes(value)
//             ? selectedRooms.filter((room) => room !== value)
//             : [...selectedRooms, value];
//         onChange(updatedSelectedRooms);
//     };

//     const adjustedRoomData = roomData?.map((el) => {
//         if (language !== "en") {
//             const mappedLabel =
//                 el.value === "studio"
//                     ? "1"
//                     : el.value === "6+"
//                         ? "7+"
//                         : (parseInt(el.value) + 1).toString();
//             return { ...el, label: mappedLabel };
//         }
//         return el;
//     });

//     return (
//         <div className="roomsSelector">
//             {adjustedRoomData.map((el) => (
//                 <button
//                     type="button"
//                     key={el.value}
//                     id={el.label}
//                     value={el.value}
//                     onClick={() => handleRoomClick(el.value)}
//                     className="roomsSelector__btn"
//                     style={{
//                         backgroundColor: selectedRooms.includes(el.value) ? "#cfd1da" : "#f3f4f8",
//                     }}
//                 >
//                     {el.label}
//                 </button>
//             ))}
//         </div>
//     );
// };
