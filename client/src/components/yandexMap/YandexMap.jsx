// import React, { useState } from 'react'
// import { YMaps, Map, SearchControl, Placemark } from "react-yandex-maps";

// const YandexMap = () => {
//     const [center, setCenter] = useState([40.1953005, 44.5642199])
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
//         <YMaps query={{ apikey: "8ffb1ed9-37fa-4567-8d01-82d384e36a7c" }}>
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
//                     {/* <Placemark geometry={[40.1953005, 44.5642199]} /> */}
//                 </Map >
//             </div>
//         </YMaps >
//     )
// }
// export default YandexMap

// https://codesandbox.io/s/yandex-map-search-organization-dutdr?file=/src/YmapsComponent.tsx:283-321

// vor im danninery dnem mejy
// https://codesandbox.io/s/confident-matsumoto-nj0dr

import React, { Component } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";

export default class YandexMap extends Component {
    map = React.createRef();
    ymaps = React.createRef();

    render() {
        return (
            <YMaps query={{
                apikey: "8ffb1ed9-37fa-4567-8d01-82d384e36a7c",
                // ns: 'use-load-option',
                // load: 'package.full'

                // ns: 'ymaps',
                // load: ['package.full', 'overlay.Polygon'].join(','),
                // apikey: "8ffb1ed9-37fa-4567-8d01-82d384e36a7c",
                // coordorder: 'longlat',
            }}>
                <Map
                    state={{ center: [40.1953005, 44.5642199], zoom: 13 }}
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
                    <Placemark geometry={[40.1953005, 44.5642199]} />
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
