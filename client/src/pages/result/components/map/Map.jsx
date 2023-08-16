import React from "react";
import { useTranslation } from "react-i18next";
import "./Map.scss";

export const Map = ({ map, setMap }) => {
  const { t } = useTranslation();

  return (
    map && (
      <div className="map">
        <button className="map__close" onClick={() => setMap(false)}>{t("close_map")}</button>
      </div>
    )
  );
};
