import React from 'react'
import { YMaps, Map, Placemark, SearchControl } from "react-yandex-maps";

const YandexMap = () => {

    return (
        <YMaps query={{ apikey: 'e44ad05b-b375-4a3d-afee-3d56b3df097d' }}>
                <Map
                    defaultState={{
                        center: [40.2000281, 44.5611624],
                        zoom: 15,
                    }
                    }
                >
                    {/* <Placemark geometry={[40.2000281, 44.5611624]} /> */}
                    <SearchControl options={{ float: "right" }} />
                </Map >
        </YMaps >
    )
}

export default YandexMap

// import { useEffect, useRef, useState } from "react";
// import {
//     YMaps,
//     Map,
//     SearchControl,
//     Placemark
// } from "react-yandex-maps";


// const mapState = { center: [55.750625, 37.626], zoom: 7 };

// const YandexMap = () => {
//     const [text, setText] = useState(null);
//     const searchRef = useRef(null);

//     useEffect(() => {
//         if (text && searchRef.current) {
//             searchRef.current.search(text);
//         }
//     }, [text]);

//     return (
//         <YMaps enterprise query={{ apikey: 'e44ad05b-b375-4a3d-afee-3d56b3df097d' }}>
//             <Map state={mapState}>
//                 <SearchControl
//                     instanceRef={ref => {
//                         if (ref) searchRef.current = ref;
//                     }}
//                 />
//                 <Placemark
//                     geometry={[55.684758, 37.738521]}
//                     properties={{
//                         balloonContentBody: "Test 1"
//                     }}
//                     // инициализируем изменение текста при клике на метку
//                     onClick={() => setText("Test 1")}
//                 />
//                 <Placemark
//                     geometry={[55.254758, 37.538521]}
//                     properties={{
//                         balloonContentBody: "Test 2"
//                     }}
//                     onClick={() => setText("Test 2")}
//                 />
//             </Map>
//         </YMaps>
//     )
// }

// export default YandexMap