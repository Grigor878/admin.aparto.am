import React from "react";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../apis/config";
import noImg from "../../assets/imgs/noImg.png";
import { room, buildingType, square } from "../../admin/svgs/svgs";
import "./PropCard.scss";
// import { useSelector } from "react-redux";

export const PropCard = ({ data }) => {
  const { pathname } = useLocation();

  // const { language } = useSelector((state => state.home))

  return (
    data && (
      <div className="propCard">
        {pathname?.includes("result")
          ? data.map(({ id, home_id, photo, price, title, street, community, rooms, buildingType, surface }) => {
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
                    <p>$ {price}</p>
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCard__card-main-center">
                    <h5>
                      {title >= 31
                        ? title.substr(0, 31) + "..."
                        : title}
                    </h5>
                    <div className="propCard__card-main-center-geo">
                      <p>{street}</p>
                      <p>{community}</p>
                    </div>
                  </div>

                  <div className="propCard__card-main-bottom">
                    <span>
                      {room.icon} {rooms}
                    </span>
                    <span>{buildingType.icon} {buildingType}</span>
                    <span>{square.icon} {surface}</span>
                  </div>
                </div>
              </Link>
            );
          })
          : data?.slice(0, 3)?.map(({ id, home_id, photo, price, title, street, community, rooms, buildingType, surface }) => {
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
                    <p>$ {price}</p>
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCard__card-main-center">
                    <h5>
                      {title >= 31
                        ? title.substr(0, 31) + "..."
                        : title}
                    </h5>
                    <div className="propCard__card-main-center-geo">
                      <p>{street}</p>
                      <p>{community}</p>
                    </div>
                  </div>

                  <div className="propCard__card-main-bottom">
                    <span>
                      {room.icon} {rooms}
                    </span>
                    <span>{buildingType.icon} {buildingType}</span>
                    <span>{square.icon} {surface}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    )
  );
};
