import React, { useState } from 'react'
import { random } from '../../../../../helpers/utils'
import baseApi from '../../../../../apis/baseApi'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import './AddModal.scss'

export const AddModal = ({ title, active, setActive, name }) => {
    const [arm, setArm] = useState()
    const [rus, setRus] = useState()
    const [eng, setEng] = useState()

    const postAddedField = () => {
        let unique = random(1001)

        let am = {
            [name]: {
                // name: eval(val),
                // id: eval(val) + unique
                name: arm,
                id: name + unique // property_unique id
            }
        }
        let ru = {
            [name]: {
                // name: eval(val),
                // id: eval(val) + unique,
                name: rus,
                id: name + unique
            }
        }
        let en = {
            [name]: {
                // name: eval(val),
                // id: eval(val) + unique,
                name: eng,
                id: name + unique
            }
        }

        const global = { am, en, ru }
        console.log(global, 'дсадасд')

        baseApi.post('/api/addGlobalFormField', global)
    }

    console.log(arm);

    return (
        <div className={active ? "addModal-close" : "addModal-open"}>
            <div className='addModal__card'>
                <h3>Ավելացնել Դաշտ</h3>

                <p>Դուք ցանկանում եք ավելացնել նոր դաշտ “{title}” բաժնում</p>

                <span>Lezuner</span>

                <label className='addModal__card-label'>
                    դաշտի անվանում AM*
                    <input
                        type="text"
                        placeholder='Նշեք դաշտի անվանումը'
                        className=''
                        minLength="3"
                        onChange={(e) => setArm(e.target.value)}
                    />
                </label>
                <label className='addModal__card-label'>
                    դաշտի անվանում RU*
                    <input
                        type="text"
                        placeholder='Նշեք դաշտի անվանումը'
                        className=''
                        minLength="3"
                        onChange={(e) => setRus(e.target.value)}
                    />
                </label>
                <label className='addModal__card-label'>
                    դաշտի անվանում EN*
                    <input
                        type="text"
                        placeholder='Նշեք դաշտի անվանումը'
                        className=''
                        minLength="3"
                        onChange={(e) => setEng(e.target.value)}
                    />
                </label>

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
