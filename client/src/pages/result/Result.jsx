import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { filterOpen, openMap } from "../../assets/svgs/svgs";
import { Sider } from "./components/sider/Sider";
import { PropCard } from "../../components/propCard/PropCard";
// import { getAllPropertiesByType } from "../../store/slices/viewSlice";
import { Loader } from "../../components/loader/Loader";
import { Map } from "./components/map/Map";
import "./Styles.scss";

const Result = () => {
  const { t } = useTranslation();

  const { loading, resultData, siderData } = useSelector((state) => state.view);

  const [sider, setSider] = useState(true);
  // const [radio, setRadio] = useState(propertyType);
  const [map, setMap] = useState(false);

  useEffect(() => {
    if(map){
      setSider(false)
    }
    // map ? setSider(false) : setSider(true);
  }, [map]);

  const { siderLoading } = useSelector((state) => state.view);

  // console.log(siderData);

  return loading ? (
    <Loader />
  ) : (
    <div className="result">
      <Sider
        open={sider}
        setOpen={setSider}
        map={map}
        // radio={radio}
        // setRadio={setRadio}
      />

      {siderLoading 
      ? <Loader/>
      : <div className="result__center">
        <div className="result__center-top">
          <div className="result__center-top-right">
            {!sider && (
              <button onClick={() => setSider(true)}>{filterOpen.icon}</button>
            )}
            <h2>{siderData ? siderData?.length : resultData?.length} {t("result")}</h2>
          </div>

          {!map && (
            <button onClick={() => setMap(!map)}>
              {openMap.icon} {t("map")}
            </button>
          )}
        </div>

        {/* <PropCard data={siderData ? siderData : resultData} /> */}
        <PropCard data={resultData} />
      </div>}

      <Map map={map} setMap={setMap} />
    </div>
  );
};

export default Result;
