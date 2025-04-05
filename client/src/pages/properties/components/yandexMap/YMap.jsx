import React from "react";
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";
import "./YandexMap.scss";

export const YMap = ({ value, width, height }) => {
  const key = process.env.REACT_APP_YMAP_API_KEY;

  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
  };

  const initialState = {
    title: "",
    center: value,
    zoom: 17,
  };

  return (
    <YMaps query={{ apikey: key, lang: "en_RU" }}>
      <div className="yandex__map">
        <Map {...mapOptions} state={initialState} width={width} height={height}>
          <Placemark geometry={value} />
          <ZoomControl />
        </Map>
      </div>
    </YMaps>
  );
};
