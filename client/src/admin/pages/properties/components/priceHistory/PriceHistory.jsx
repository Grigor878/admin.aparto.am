import React, { useState } from 'react'
import { amdFormater, usdFormater } from '../../../../../helpers/formatters'
import { down, up } from '../../../../svgs/svgs'
import '../../pages/Styles.scss'
import { useSelector } from 'react-redux'

export const PriceHistory = ({ data }) => {
    const [price, setPrice] = useState(true)

    const { exchange, exchangeValue } = useSelector((state => state.home))

    return (
        <div
            className='singleProperty__content-right-price-history'
            onClick={() => setPrice(!price)}
        >
            <p>
                Գնի պատմություն ։  {price ? down.icon : up.icon}
            </p>

            <div className={price ? 'singleProperty__content-right-price-history-list' : 'singleProperty__content-right-price-history-listActive'}>
                {!data || data?.length === 0
                    ? <div
                        className='singleProperty__content-right-price-history-listActive-view'
                    >
                        <p>Փոփոխություններ չեն կատարվել:</p>
                    </div>
                    : data?.map(({ price, date }) => {
                        return (
                            <div
                                className='singleProperty__content-right-price-history-listActive-view'
                                key={date + price}
                            >
                                {exchange === 1 && <p>{usdFormater(price)} </p>}
                                {exchange === 2 && <p>&#1423; {amdFormater(price, exchangeValue)} </p>}
                                <p>{date}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
