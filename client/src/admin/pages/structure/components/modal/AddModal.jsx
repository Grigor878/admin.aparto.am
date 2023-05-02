import React, { useState } from 'react'
import { flags } from '../../../properties/components/dropdowns/data'
import Flag from 'react-world-flags'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import { random } from '../../../../../helpers/utils'
import baseApi from '../../../../../apis/baseApi'
import { error } from '../../../../../components/swal/swal'
import './AddModal.scss'

export const AddModal = ({ title, active, setActive, name }) => {
    const [arm, setArm] = useState('')
    const [rus, setRus] = useState('')
    const [eng, setEng] = useState('')

    const [activeFlag, setActiveFlag] = useState('am')

    const postAddedField = () => {
        if (arm && rus && eng) {

            let uniqueId = name + "_" + eng.toLowerCase().split(' ').join('')

            let am = {
                [name]: {
                    name: arm,
                    id: uniqueId + '-am'
                }
            }
            let ru = {
                [name]: {
                    name: rus,
                    id: uniqueId + '-ru'
                }
            }
            let en = {
                [name]: {
                    name: eng,
                    id: uniqueId + '-en'
                }
            }

            setArm("")
            setRus("")
            setEng("")

            const global = { am, en, ru }
            console.log(global)
            // baseApi.post('/api/addGlobalFormField', global)
            setActive(true)
            // window.location.reload(false)
        } else {
            error("Complete all fields!")
        }
    }

    return (
        <div className={active ? "addModal-close" : "addModal-open"}>
            <div className='addModal__card'>
                <h3>Ավելացնել Դաշտ</h3>

                <p>Դուք ցանկանում եք ավելացնել նոր դաշտ “{title}” բաժնում</p>

                <div>
                    <div className="addModal__card-flags">
                        {flags.map(({ country_code }) => (
                            <Flag
                                key={country_code}
                                code={country_code}
                                onClick={() => setActiveFlag(country_code)}
                                className={activeFlag === country_code ? 'addModal__card-flags-flagActive' : 'addModal__card-flags-flag'}
                                width="36"
                                height="20"
                            />
                        ))}
                    </div>

                    {activeFlag === "am"
                        ? <label className='addModal__card-label'>
                            դաշտի անվանում *
                            <input
                                value={arm}
                                type="text"
                                placeholder='Նշեք դաշտի անվանումը'
                                className=''
                                minLength="3"
                                onChange={(e) => setArm(e.target.value)}
                            />
                        </label>
                        : activeFlag === "ru"
                            ? <label className='addModal__card-label'>
                                դաշտի անվանում {activeFlag}*
                                <input
                                    value={rus}
                                    type="text"
                                    placeholder='Նշեք դաշտի անվանումը'
                                    className=''
                                    minLength="3"
                                    onChange={(e) => setRus(e.target.value)}
                                />
                            </label>
                            : <label className='addModal__card-label'>
                                դաշտի անվանում {activeFlag}*
                                <input
                                    value={eng}
                                    type="text"
                                    placeholder='Նշեք դաշտի անվանումը'
                                    className=''
                                    minLength="3"
                                    onChange={(e) => setEng(e.target.value)}
                                />
                            </label>}
                </div>

                <BtnOnclick
                    text="Պահպանել"
                    onClick={postAddedField}
                />

                <button
                    className='addModal__card-discard'
                    onClick={() => setActive(true)}
                >
                    Չեղարկել
                </button>
            </div>
        </div>
    )
}
