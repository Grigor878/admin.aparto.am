import React from 'react'
import YandexMap from '../../components/yandexMap/YandexMap'
import './Sale.scss'

const Sale = () => {
    return (
        <section>
            <div className="container">
                <h1>Sale</h1>

                <h4>Map Test</h4>
                <YandexMap />
            </div>
        </section>
    )
}

export default Sale