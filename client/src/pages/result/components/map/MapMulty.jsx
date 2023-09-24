import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { useTranslation } from "react-i18next";
import { CardById } from "../cardById/CardById";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "./MapMulty.scss";

export const MapMulty = ({ map, setMap, data }) => {
  const { t } = useTranslation();

  const mobile = useMediaQuery({ maxWidth: 768 })

  const { language } = useSelector((state) => state.home);

  const [selectedItem, setSelectedItem] = useState(null);

  const handlePlacemarkClick = item => {
    setSelectedItem(item)
  };

  const closeCard = () => {
    setSelectedItem(null)
  };

  const handleClose = () => {
    setMap(false)
    setSelectedItem(null)
  }

  useEffect(() => {
    setMap(false)
    setSelectedItem(null)
  }, [language, setMap])
  

  return (
    map && (
      <div className="map">
        <button className="map__close" onClick={handleClose}>{t("close_map")}</button>

        <div className="map_ymap">
          <YMaps query={{ apikey: "e04526f5-e9c9-42b5-9b1f-a65d6cd5b19e", lang: "en_RU" }}>
            <Map
              defaultState={{
                center: [40.177200, 44.503490],
                zoom: 12,
              }}
              width={!mobile ? "708px" : "100vw"}
              height="100vh"
            >
              {data?.map(item => (
                <Placemark
                  key={item.id}
                  geometry={item.locate}
                  onClick={() => handlePlacemarkClick(item)}
                  properties={{
                    hintContent: item.title,
                  }}
                />
              ))}
              <ZoomControl />
            </Map>
          </YMaps>

          {selectedItem &&
            <CardById selectedItem={selectedItem} closeCard={closeCard} />
          }
        </div>
      </div>
    )
  );
};
