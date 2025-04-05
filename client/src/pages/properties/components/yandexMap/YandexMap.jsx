import React, { useEffect, useRef, useState } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";
import { useDispatch } from "react-redux";
import { setYandex } from "../../../../store/slices/propertySlice";
import "./YandexMap.scss";

const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { suppressMapOpenBlock: true },
};

export const YandexMap = ({ title, defValue, style, height }) => {
  const key = process.env.REACT_APP_YMAP_API_KEY;

  const dispatch = useDispatch();

  const initialState = {
    title: "",
    center: defValue ? defValue : [40.1772, 44.50349],
    zoom: 17,
  };

  const [state, setState] = useState({ ...initialState });
  const [placemark, setPlacemark] = useState(defValue ? defValue : []);
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setPlacemark(newCoords);
            setState((prevState) => ({ ...prevState, center: newCoords }));
            dispatch(setYandex(newCoords));
          });
        }
      );
    }
  }, [dispatch, mapConstructor]);

  // change placemark
  const handleClick = (event) => {
    const coords = event.get("coords");
    dispatch(setYandex(coords));
    setPlacemark(coords);
  };

  return (
    <YMaps query={{ apikey: key, lang: "en_RU" }}>
      {title}
      <div className="yandex__map">
        <input
          ref={searchRef}
          placeholder="Search..."
          disabled={!mapConstructor}
          className="yandex__map-search"
        />
        <Map
          {...mapOptions}
          state={state}
          onLoad={setMapConstructor}
          instanceRef={mapRef}
          width={style}
          height={height}
          onClick={handleClick}
        >
          <Placemark geometry={placemark} />
          <ZoomControl />
        </Map>
      </div>
    </YMaps>
  );
};
