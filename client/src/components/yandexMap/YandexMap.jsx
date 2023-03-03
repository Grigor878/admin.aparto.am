import React from 'react'
import { YMaps, Map, Placemark } from "react-yandex-maps";

const YandexMap = () => {
    return (
        <YMaps>
            <div>
                <Map
                    defaultState={{
                        center: [40.2000281, 44.5611624],
                        zoom: 15,
                    }}
                >
                    <Placemark geometry={[40.2000281, 44.5611624]} />
                </Map>
            </div>
        </YMaps>
    )
}

export default YandexMap