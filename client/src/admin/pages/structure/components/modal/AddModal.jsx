import React, { useState } from 'react'
import { random } from '../../../../../helpers/utils'
import baseApi from '../../../../../apis/baseApi'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import './AddModal.scss'

export const AddModal = ({ title, active, setActive }) => {
    // Gev jan mi state i meja sax galu,de amen avelacneluc mi hat en avelacnum meka
    // amen lezvin mi state klni eli esi hayrenna
    const [state, setState] = useState()
    // en vor Structure um juridical ban er es dranqa mi tex bayc postAddedField i mej hin logikana der

    //Ste moment ka
    //AddModaly etuma Card yndic nor structure // nu props chi uxxaki,kjoges et lav hech

    // backin stic enq uxarkum el structure ejic chi
    const postAddedField = (val) => {
        let unique = random(100)
        // state y stex eli eval neri texy(eval - y setJuridical,setInfo dranq er)
        let am = {
            [val]: {
                name: eval(val),
                id: eval(val) + unique
            }
        }
        let ru = {
            [val]: {
                name: eval(val),
                id: eval(val) + unique,
            }
        }
        let en = {
            [val]: {
                name: eval(val),
                id: eval(val) + unique,
            }
        }

        const global = { am, en, ru }
        console.log(global)
        baseApi.post('/api/addGlobalFormField', global)
    }

    return (
        <div className={active ? "addModal-close" : "addModal-open"}>
            <div className='addModal__card'>
                <h3>Ավելացնել Դաշտ</h3>

                <p>Դուք ցանկանում եք ավելացնել նոր դաշտ “{title}” բաժնում</p>

                <span>Lezuner</span>

                <label className='addModal__card-label'>
                    դաշտի անվանում*
                    <input
                        type="text"
                        placeholder='Նշեք դաշտի անվանումը'
                        className=''
                        minLength="3"
                        onChange={(e) => setState(e.target.value)}
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
