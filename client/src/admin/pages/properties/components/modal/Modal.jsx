import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import '../../../structure/components/modal/Modal.scss'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { calendar } from '../../../../svgs/svgs'
import { formatDateString } from '../../../../../helpers/formatters'
import { deactivateHome } from '../../../../../store/slices/propertySlice'
import './Modal.scss'

export const Modal = ({ id, open, setOpen }) => {
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch();

    const handleDeactivateHome = () => {
        const formattedDate = formatDateString(date);
        dispatch(deactivateHome({ id, date: formattedDate }))
        // .then(() => {
        //     setOpen(false)
        // })
    };

    return (
        <div className={!open ? "modal-close" : "modal-open"}>
            <div className='modal__card'>
                <h3>Գույքի Ապաակտիվացում</h3>

                <p>Ստորև նշեք ակտիվացման օրը տվյալ գույքի համար</p>

                <div className='modal__input'>
                    <DatePicker
                        className='modal__input-picker'
                        selected={date}
                        onChange={(date) => setDate(date)}
                        disabledKeyboardNavigation
                        placeholderText={date}
                        dateFormat="dd/MM/yyyy"
                        withPortal
                        minDate={new Date()}
                    />
                    <span>{calendar.icon}</span>
                </div>

                <BtnOnclick
                    text="Ապաակտիվացնել"
                    onClick={handleDeactivateHome}
                />

                <button
                    className='modal__card-discard'
                    onClick={() => setOpen(false)}
                >
                    Չեղարկել
                </button>
            </div>
        </div>
    )
}
