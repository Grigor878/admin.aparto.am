import React from "react";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../apis/config";
import noImg from "../../assets/imgs/noImg.png";
import { rooms, buildingType, square } from "../../admin/svgs/svgs";
import "./PropCard.scss";
// import { useSelector } from "react-redux";

export const PropCard = ({ data }) => {
  const { pathname } = useLocation();

  // const { language } = useSelector((state => state.home))

  return (
    data && (
      <div className="propCard">
        {pathname?.includes("result")
          ? data.map(({ id, home_id, photo, am }) => {
            return (
              <Link
                key={id}
                target={"_blank"}
                to={`/result/${id}`}
                className="propCard__card"
                style={{ width: "325px" }}
              >
                {/* <div key={id} className='propCard__card'> */}
                <img
                  src={
                    photo[0]?.name
                      ? `${API_BASE_URL}/images/${photo[0]?.name} `
                      : noImg
                  }
                  className="propCard__card-imgSmall"
                  alt="HomeImg"
                />

                <div className="propCard__card-main">
                  <div className="propCard__card-main-top">
                    <p>$ {am[2]?.fields[0]?.value}</p>
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCard__card-main-center">
                    <h5>
                      {am[0]?.fields[2]?.value?.length >= 31
                        ? am[0]?.fields[2]?.value.substr(0, 31) + "..."
                        : am[0]?.fields[2]?.value}
                    </h5>
                    <div className="propCard__card-main-center-geo">
                      <p>{am[1]?.fields[0]?.communityStreet?.value}</p>
                      <p>{am[1]?.fields[0]?.value}</p>
                    </div>
                  </div>

                  <div className="propCard__card-main-bottom">
                    <span>
                      {rooms.icon} {am[3]?.fields[2]?.value}
                    </span>
                    <span>
                      {buildingType.icon}
                      {am[4]?.fields[0]?.value}
                    </span>
                    <span>
                      {square.icon}
                      {am[3]?.fields[0]?.value}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
          : data?.slice(0, 3)?.map(({ id, home_id, photo, am }) => {
            return (
              <Link
                key={id}
                target={"_blank"}
                to={`/result/${id}`}
                className="propCard__card"
                style={{ width: "384px" }}
              >
                <img
                  src={
                    photo[0]?.name
                      ? `${API_BASE_URL}/images/${photo[0]?.name} `
                      : noImg
                  }
                  className="propCard__card-imgLarg"
                  alt="HomeImg"
                />

                <div className="propCard__card-main">
                  <div className="propCard__card-main-top">
                    <p>$ {am[2]?.fields[0]?.value}</p>
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCard__card-main-center">
                    <h5>
                      {am[0]?.fields[2]?.value?.length >= 31
                        ? am[0]?.fields[2]?.value.substr(0, 31) + "..."
                        : am[0]?.fields[2]?.value}
                    </h5>
                    <div className="propCard__card-main-center-geo">
                      <p>{am[1]?.fields[0]?.communityStreet?.value}</p>
                      <p>{am[1]?.fields[0]?.value}</p>
                    </div>
                  </div>

                  <div className="propCard__card-main-bottom">
                    <span>
                      {rooms.icon} {am[3]?.fields[2]?.value}
                    </span>
                    <span>
                      {buildingType.icon}
                      {am[4]?.fields[0]?.value}
                    </span>
                    <span>
                      {square.icon}
                      {am[3]?.fields[0]?.value}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    )
  );
};
