import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { filterOpen, openMap } from "../../assets/svgs/svgs";
import { Sider } from "./components/sider/Sider";
import { PropCard } from "../../components/propCard/PropCard";
import { getAllPropertiesByType } from "../../store/slices/homeSlice";
import { Loader } from "../../components/loader/Loader";
import { Map } from "./components/map/Map";
import "./Styles.scss";

const Result = () => {
  const { t } = useTranslation();

  const { language, propertyType, loading, searchResult, allPropertiesByType } =
    useSelector((state) => state.home);
  const { resultData } = useSelector((state) => state.view);
  // console.log(resultData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchResult === null) {
      dispatch(getAllPropertiesByType({ type: propertyType }));
    }
  }, [dispatch, propertyType, searchResult]);

  const [sider, setSider] = useState(true);
  const [radio, setRadio] = useState(propertyType);
  const [map, setMap] = useState(false);

  useEffect(() => {
    map ? setSider(false) : setSider(true);
  }, [map]);

  return loading ? (
    <Loader />
  ) : (
    <div className="result">
      <Sider
        open={sider}
        setOpen={setSider}
        map={map}
        radio={radio}
        setRadio={setRadio}
        language={language}
      />

      {/* article */}
      <div className="result__center">
        <div className="result__center-top">
          <div className="result__center-top-right">
            {!sider && (
              <button onClick={() => setSider(true)}>{filterOpen.icon}</button>
            )}
            <h2>
              {resultData
                ? resultData?.length
                : searchResult
                ? searchResult?.length
                : allPropertiesByType?.length}{" "}
              {t("result")}
            </h2>
          </div>
          {/* <h2>{searchResult?.length} {t("result")}</h2> */}

          {!map && (
            <button onClick={() => setMap(!map)}>
              {openMap.icon} {t("map")}
            </button>
          )}
        </div>

        <PropCard
          data={
            resultData
              ? resultData
              : searchResult
              ? searchResult
              : allPropertiesByType
          }
        />
        {/* <PropCard data={searchResult} /> */}
      </div>

      <Map map={map} setMap={setMap} />
    </div>
  );
};

export default Result;
