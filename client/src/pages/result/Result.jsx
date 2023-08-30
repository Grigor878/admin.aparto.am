import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterOpen, openMap } from "../../assets/svgs/svgs";
import { Sider } from "./components/sider/Sider";
import { PropCard } from "../../components/propCard/PropCard";
import { Loader } from "../../components/loader/Loader";
import { MapMulty } from "./components/map/MapMulty";
import { Pagination } from "./components/pagination/Pagination";
import "./Styles.scss";

const Result = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const { loading, resultData, siderData } = useSelector((state) => state.view);

  const [sider, setSider] = useState(true);
  const [map, setMap] = useState(false);

  useEffect(() => {
    if (map) {
      setSider(false)
    }
    else {
      setSider(true)
    }
  }, [map]);

  const { siderLoading } = useSelector((state) => state.view);

  const handleOpen = () => {
    setMap(!map)
    window.scroll(0, 0)
  }

  const handlePageChange = (page) => {
    page === 1 ? searchParams.delete("page") : searchParams.set("page", page);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="result">
      <Sider
        open={sider}
        setOpen={setSider}
      />

      {siderLoading
        ? <Loader />
        : <div className="result__center">
          <div className="result__center-top">
            <div className="result__center-top-right">
              {!sider && (
                <button onClick={() => setSider(true)}>{filterOpen.icon}</button>
              )}
              {(siderData?.length || resultData?.length)
                && <h2>{siderData ? siderData?.length : resultData?.length} {t("result")}</h2>}
            </div>

            {!map && (
              <button onClick={handleOpen}>
                {openMap.icon} {t("map")}
              </button>
            )}
          </div>

          <PropCard data={siderData ? siderData?.slice(0, 14) : resultData?.slice(0, 14)} />

          {(siderData?.length || resultData?.length)
            && <Pagination
              // currentPage={getInfo?.data?.current_page}
              // lastPage={getInfo?.data?.last_page}
              currentPage="1"
              lastPage="15"
              setPage={handlePageChange}
            />}
        </div>}

      {(siderData?.length || resultData?.length)
        && <MapMulty map={map} setMap={setMap} data={siderData ? siderData : resultData} />}
    </div>
  );
};

export default Result;
