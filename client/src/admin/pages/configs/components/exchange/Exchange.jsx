import React, { useState } from 'react'
import { InputSymbol } from '../../../properties/components/inputs/InputSymbol'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import { error, success } from '../../../../../components/swal/swal'
import './Exchange.scss'

export const Exchange = () => {
    const [ex, setEx] = useState('')

    const addExchange = () => {
        ex.length
            ? success(`Դոլարի կուրսը փոփոխված է։`)
            : error("Լրացրեք դոլարի կուրսը!")
    }

    return (
        <section className='exchange'>
            <h6>դոլարի կուրս {ex.length ? `- 1 USD = ${ex} AMD` : null}</h6>

            <div className='exchange__form'>
                <InputSymbol
                    id="exchangeField"
                    type="number"
                    placeholder="Մուտքագրեք դոլարի կուրսը"
                    name="price"
                    onChange={(e) => setEx(e.target.value)}
                    width="350px"
                />
                <BtnOnclick
                    onClick={addExchange}
                    text="Պահպանել"
                />
            </div>
        </section>
    )
}
