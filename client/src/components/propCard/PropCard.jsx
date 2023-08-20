import React from "react";
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../apis/config";
import noImg from "../../assets/imgs/noImg.png";
import { room, buildType, square } from "../../admin/svgs/svgs";
import { amdFormater, cutCommunity, cutText, sqmToFt2, usdFormater } from "../../helpers/formatters";
import "./PropCard.scss";

export const PropCard = ({ data }) => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  const { size, exchange, exchangeValue } = useSelector((state => state.home))

  return (
    data && (
      <div className="propCard">
        {!pathname?.includes("result")
          ? data?.slice(0, 3).map(({ id, home_id, photo, price, title, street, community, rooms, buildingType, surface }) => {
            return (
              <Link
                key={id}
                target={"_blank"}
                to={`/result/${id}`}
                className="propCard__card"
              >
                <img
                  src={
                    photo?.length
                      ? `${API_BASE_URL}/images/${photo[0]} `
                      : noImg
                  }
                  className="propCard__card-img"
                  alt="HomeImg"
                />

                <div className="propCard__card-main">
                  <div className="propCard__card-main-top">
                    {exchange === 2
                      ? <p>&#1423;  {amdFormater(price, exchangeValue)}</p>
                      : <p>{usdFormater(price)}</p>
                    }
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCard__card-main-center">
                    <h5>
                      {title?.length >= 29
                        ? cutText(title, 29)
                        : title}
                    </h5>
                    <div className="propCard__card-main-center-geo">
                      <p>{cutCommunity(street)}</p>
                      <p>{community}</p>
                    </div>
                  </div>

                  <div className="propCard__card-main-bottom">
                    <span>{room.icon} {rooms} {t("room")}</span>
                    <span>{buildType.icon} {buildingType}</span>
                    {size === 1
                      ? <span>{square.icon} {surface} {t("square_symbol")}</span>
                      : <span>{square.icon} {sqmToFt2(surface)} {t("ft_symbol")}</span>
                    }
                  </div>
                </div>
              </Link>
            );
          })
          : data?.map(({ id, home_id, photo, price, title, street, community, rooms, buildingType, surface }) => {
            return (
              <Link
                key={id}
                target={"_blank"}
                to={`/result/${id}`}
                className="propCard__cardResult"
              >
                <img
                  src={
                    photo?.length
                      ? `${API_BASE_URL}/images/${photo[0]} `
                      : noImg
                  }
                  className="propCard__cardResult-img"
                  alt="HomeImg"
                />

                <div className="propCard__cardResult-main">
                  <div className="propCard__cardResult-main-top">
                    {exchange === 2
                      ? <p>&#1423;  {amdFormater(price, exchangeValue)}</p>
                      : <p>{usdFormater(price)}</p>
                    }
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCard__cardResult-main-center">
                    <h5>
                      {title?.length >= 25
                        ? cutText(title, 25)
                        : title}
                    </h5>
                    <div className="propCard__cardResult-main-center-geo">
                      <p>{cutCommunity(street)}</p>
                      <p>{community}</p>
                    </div>
                  </div>

                  <div className="propCard__cardResult-main-bottom">
                    <span>{room.icon} {rooms} {t("room")}</span>
                    <span>{buildType.icon} {buildingType}</span>
                    {size === 1
                      ? <span>{square.icon} {surface} {t("square_symbol")}</span>
                      : <span>{square.icon} {sqmToFt2(surface)} {t("ft_symbol")}</span>
                    }
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    )
  );
};
