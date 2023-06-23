import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { InputSymbol } from '../../../properties/components/inputs/InputSymbol'
import { BtnOnclick } from '../../../../components/buttons/BtnOnclick'
import { error, success } from '../../../../../components/swal/swal'
import './Exchange.scss'
import { getExchangeData, setExchangeData } from '../../../../../store/slices/configsSlice'

export const Exchange = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getExchangeData())
    }, [dispatch])

    const { exchange } = useSelector((state) => state.configs)
    // console.log(exchange)//

    const [value, setValue] = useState('')

    const addExchange = () => {
        if (value.length < 3 && value.length !== 0) {
            error("Գրեք իրական կուրսը!")
        } else if (value.length >= 3) {
            let ex = {
                exchange: value
            }

            dispatch(setExchangeData({ ex }))
            success(`Դոլարի կուրսը փոփոխված է։`)
            setValue('')
        } else {
            error("Լրացրեք դոլարի կուրսը!")
        }
    }

    return (
        <section className='exchange'>
            <h6>դոլարի կուրս {value.length ? `- 1 USD = ${value} AMD` : null}</h6>

            <div className='exchange__form'>
                <InputSymbol
                    id="exchangeField"
                    type="number"
                    placeholder="Մուտքագրեք դոլարի կուրսը"
                    name="price"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
