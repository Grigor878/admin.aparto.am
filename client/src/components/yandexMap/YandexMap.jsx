// import React, { useState } from 'react'
// import { YMaps, Map, SearchControl, Placemark } from "react-yandex-maps";

// const YandexMap = () => {
//     // const apikey = 'c6f73ad1-401a-4923-93c8-37a304669c9d'

//     const [center, setCenter] = useState([55.753215, 37.622504])
//     const [zoom, setZoom] = useState(10)
//     const [placemarkCoordinates, setPlacemarkCoordinates] = useState(null)

//     const handleSearchResult = (result) => {
//         const firstResult = result.get(0)
//         if (firstResult) {
//             setCenter(firstResult.geometry.getCoordinates())
//             setZoom(15);
//             setPlacemarkCoordinates(firstResult.geometry.getCoordinates())
//         }
//     };

//     return (
//         // <YMaps query={{ apikey: 'c6f73ad1-401a-4923-93c8-37a304669c9d' }}>
//         <YMaps query={{ apikey: 'c6f73ad1-401a-4923-93c8-37a304669c9d' }}>
//             <div style={{ height: '400px' }}>
//                 <Map
//                     defaultState={{ center, zoom }}
//                     width="100%"
//                     height="100%"
//                 >
//                     <SearchControl
//                         options={{ float: 'right' }}
//                         onResultSelect={(e) => handleSearchResult(e.originalEvent.target._items)}
//                     />
//                     {placemarkCoordinates && <Placemark geometry={placemarkCoordinates} />}
//                     {/* <Placemark geometry={[40.2000281, 44.5611624]} /> */}
//                 </Map >
//             </div>
//         </YMaps >
//     )
// }

// export default YandexMap

// https://codesandbox.io/s/yandex-map-search-organization-dutdr?file=/src/YmapsComponent.tsx:283-321

import React, { Component } from "react";
import { YMaps, Map, ZoomControl } from "react-yandex-maps";

export default class YandexMap extends Component {
    map = React.createRef();
    ymaps = React.createRef();

    render() {
        return (
            <YMaps enterprise query={{
                apikey: "c6f73ad1-401a-4923-93c8-37a304669c9d",
                ns: 'use-load-option',
                load: 'package.full'
            }}>
                <Map
                    state={{ center: [55.76, 37.64], zoom: 10 }}
                    instanceRef={this.map}
                    onLoad={(ymapsInstance) => {
                        this.ymaps.current = ymapsInstance;
                        this.addSearchControlEvents();
                    }}
                    width="100%"
                    height="400px"
                    modules={["control.SearchControl"]}
                >
                    <ZoomControl
                        options={{ float: "none", position: { top: 100, right: 10 } }}
                    />
                </Map>
            </YMaps>
        );
    }

    addSearchControlEvents = () => {
        const map = this.map.current;
        const ymaps = this.ymaps.current;

        const searchControl = new ymaps.control.SearchControl({
            options: {
                float: "left",
                floatIndex: 300,
                provider: "yandex#search",
                geoObjectStandardPreset: "islands#blueDotIcon",
                placeholderContent: "Поиск мест и адресов",
                maxWidth: 320,
                size: "large"
            }
        });
        map.controls.add(searchControl);

        searchControl.events.add("resultselect", function (e) {
            const searchCoords = searchControl.getResponseMetaData().SearchResponse
                .Point.coordinates;
            const display = searchControl.getResponseMetaData().SearchResponse
                .display;

            //console.log(searchControl.getResponseMetaData());

            if (display && display === "multiple") {
                map.setCenter([searchCoords[1], searchCoords[0]], 11);
            }
        });
    };
}
