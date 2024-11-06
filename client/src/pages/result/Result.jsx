import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { filterOpen, openMap } from "../../assets/svgs/svgs";
import { Sider } from "./components/sider/Sider";
import { PropCard } from "../../components/propCard/PropCard";
import { Loader } from "../../components/loader/Loader";
import { MapMulty } from "./components/map/MapMulty";
import { Pagination } from "./components/pagination/Pagination";
import { setPage, setPaginatePage } from "../../store/slices/viewSlice";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import useQueryParams from "../../hooks/useQueryParams";
import "./Styles.scss";

const Result = () => {
  const mobile = useMediaQuery({ maxWidth: 768 });

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [page, setParams] = useQueryParams(["page"]);
  // const itemsPerPage = 5;

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
    setParams({ page: page === 1 ? null : page });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1200);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="result">
      <HelmetAsync description="main_title_seo" />
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
              // currentPage={paginateData?.current_page}
              currentPage={
                paginateData?.current_page || parseInt(page, 10) || 1
              }
              lastPage={paginateData?.last_page}
              setPage={handlePageChange}
            />
          ) : // <Paginator
          //   data={data}
          //   itemsPerPage={itemsPerPage}
          //   onPageChange={handlePageChange}
          //   page={page}
          //   setParams={setParams}
          // />
          null}
        </div>
      )}

      {data?.length ? <MapMulty map={map} setMap={setMap} data={data} /> : null}
    </div>
  );
};

export default Result;
