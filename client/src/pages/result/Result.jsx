import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterOpen, openMap } from "../../assets/svgs/svgs";
import { Sider } from "./components/sider/Sider";
import { PropCard } from "../../components/propCard/PropCard";
import { Loader } from "../../components/loader/Loader";
import { MapMulty } from "./components/map/MapMulty";
import { Pagination } from "./components/pagination/Pagination";
import { setPage, setPaginatePage } from "../../store/slices/viewSlice";
import "./Styles.scss";

const Result = () => {
  const mobile = useMediaQuery({ maxWidth: 768 });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const { loading, siderLoading, resultData, siderData } = useSelector(
    (state) => state.view
  );

  const data = siderData ? siderData?.data : resultData?.data;
  const paginateData = siderData ? siderData : resultData;

  const [sider, setSider] = useState(!mobile);
  const [map, setMap] = useState(false);

  useEffect(() => {
    if (map) {
      setSider(false);
    } else {
      setSider(!mobile);
    }
  }, [map, mobile]);

  const handlePageChange = (page) => {
    dispatch(setPage("result"));
    dispatch(setPaginatePage(page));
    page === 1 ? searchParams.delete("page") : searchParams.set("page", page);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1200);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="result">
      <Sider open={sider} setOpen={setSider} />

      {siderLoading ? (
        <Loader />
      ) : (
        <div className="result__center">
          <div className="result__center-top ">
            <div className="result__center-top-right">
              {!sider && (
                <button onClick={() => setSider(true)}>
                  {filterOpen.icon}
                </button>
              )}

              {paginateData?.total ? (
                <h2>
                  {paginateData?.total} {t("result")}
                </h2>
              ) : null}

              {data !== undefined && !paginateData?.total ? (
                <h2>
                  {data?.length} {t("result")}
                </h2>
              ) : null}
            </div>

            {!map && data?.length ? (
              <button onClick={() => setMap(!map)}>
                {openMap.icon} {t("map")}
              </button>
            ) : null}
          </div>

          <PropCard data={data} />

          {data?.length ? (
            <Pagination
              currentPage={paginateData?.current_page}
              lastPage={paginateData?.last_page}
              setPage={handlePageChange}
            />
          ) : null}
        </div>
      )}

      {data?.length ? <MapMulty map={map} setMap={setMap} data={data} /> : null}
    </div>
  );
};

export default Result;
