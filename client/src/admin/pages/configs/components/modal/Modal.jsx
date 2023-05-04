import React, { useState } from 'react'
import Flag from 'react-world-flags'
import { community, flags } from '../../../properties/components/dropdowns/data'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import { error, success } from '../../../../../components/swal/swal'
import '../../../structure/components/modal/Modal.scss'
import './Modal.scss'

export const Modal = ({ open, setOpen }) => {
    const [arm, setArm] = useState('')
    const [rus, setRus] = useState('')
    const [eng, setEng] = useState('')
    const [select, setSelect] = useState('')

    const [activeFlag, setActiveFlag] = useState('am')

    const postAddedAddress = () => {
        if (select && select !== "Ընտրեք" && arm && rus && eng) {

            let uniqueId = "address_" + eng.toLowerCase().split(' ').join('')

            let community = select;
            let am = {
                id: uniqueId,
                val: arm,
                community
            }
            let ru = {
                id: uniqueId,
                val: rus,
                community
            }
            let en = {
                id: uniqueId,
                val: eng,
                community
            }

            setArm("")
            setRus("")
            setEng("")
            setActiveFlag('am')
            setSelect('')

            const addedAddress = { am, en, ru }
            console.log(addedAddress)//

            setOpen(false)
            success('Address added !')
        } else {
            error("Complete all fields !")
        }
    }

    return (
        <div className={!open ? "modal-close" : "modal-open"}>
            <div className='modal__card'>
                <h3>Ավելացնել Հասցե</h3>

                <p>Դուք ցանկանում եք ավելացնել հասցե հասցեների ցանկում</p>

                <div>
                    <label className='modal__label'>
                        Համայնք*
                        <select
                            value={select}
                            onChange={(e) => setSelect(e.target.value)}
                            className='modal__label-select'
                        >
                            {community.map((el) => {
                                return (
                                    <option
                                        // disabled={el.id === 1 ? "disabled" : null}
                                        key={el.id}
                                        value={el.value}
                                    >{el.value}
                                    </option>
                                )
                            })}
                        </select>
                    </label>

                    <div className="modal__card-flags">
                        {flags.map(({ country_code }) => (
                            <Flag
                                key={country_code}
                                code={country_code}
                                onClick={() => setActiveFlag(country_code)}
                                className={activeFlag === country_code ? 'modal__card-flags-flagActive' : 'modal__card-flags-flag'}
                                width="36"
                                height="20"
                            />
                        ))}
                    </div>

                    {activeFlag === "am"
                        ? <label className='modal__card-label'>
                            Հասցե*
                            <input
                                value={arm}
                                type="text"
                                placeholder='Նշեք դաշտի անվանումը'
                                minLength="3"
                                onChange={(e) => setArm(e.target.value)}
                            />
                        </label>
                        : activeFlag === "ru"
                            ? <label className='modal__card-label'>
                                Հասցե {activeFlag}*
                                <input
                                    value={rus}
                                    type="text"
                                    placeholder='Նշեք դաշտի անվանումը'
                                    minLength="3"
                                    onChange={(e) => setRus(e.target.value)}
                                />
                            </label>
                            : <label className='modal__card-label'>
                                Հասցե {activeFlag}*
                                <input
                                    value={eng}
                                    type="text"
                                    placeholder='Նշեք դաշտի անվանումը'
                                    minLength="3"
                                    onChange={(e) => setEng(e.target.value)}
                                />
                            </label>}
                </div>

                <BtnOnclick
                    text="Պահպանել"
                    onClick={postAddedAddress}
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
