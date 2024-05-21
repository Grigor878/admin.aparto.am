import React, { useRef } from "react";
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { API_BASE_URL } from "../../apis/config";
import noImg from "../../assets/imgs/noImg.png";
import { roomIcon, buildType, square } from "../../assets/svgs/svgs";
import { amdFormater, sqmToFt2, usdFormater } from "../../helpers/formatters";
import "./PropCard.scss";

export const PropCard = ({ data }) => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  const { size, exchange, exchangeValue } = useSelector((state => state.home))

  const laptop = useMediaQuery({ maxWidth: 1280 })

  const scrollableDivRef = useRef(null)
  const scrollableDiv = scrollableDivRef.current

  const scroll = laptop ? 382 : 408

  return (
    data && (
      !pathname?.includes("result")
        ? <div className="scrollablePropCard">
          <AiOutlineArrowLeft className="scrollLeft" onClick={() => scrollableDiv.scrollLeft -= scroll} />
          <div className="propCard" ref={scrollableDivRef}>
            {data?.map(({ id, home_id, photo, price, title, street, community, rooms, buildingType, surface }) => {
              return (
                <Link
                  key={id}
                  target={"_blank"}
                  to={`/result/${id}`}
                  className="propCard__card"
                >
                  <div className="propCard__card-img">
                    <img
                      src={
                        photo?.length
                          ? `${API_BASE_URL}/images/${photo[0]} `
                          : noImg
                      }
                      alt="HomeImg"
                    />
                  </div>

                  <div className="propCard__card-main">
                    <div className="propCard__card-main-top">
                      {/* {(price !== "" || price === "0") && exchange === 2
                        ? <p>&#1423;  {amdFormater(price, exchangeValue)}</p>
                        : (price !== "" || price === "0") && exchange === 1 ? <p>{usdFormater(price)}</p>
                          : <p>{t("contract")}</p>
                      } */}
                      {exchange === 1 && ((price === "" || price === "0") ? <p>{t("contract")}</p> : <p>{usdFormater(price)}</p>)}
                      {exchange === 2 && ((price === "" || price === "0") ? <p>{t("contract")}</p> : <p>&#1423; {amdFormater(price, exchangeValue)}</p>)}
                      <span>ID {home_id}</span>
                    </div>

                    <div className="propCard__card-main-center">
                      <h5>{title}</h5>
                      <div className="propCard__card-main-center-geo">
                        {/* <p>{language === "ru" ? cutCommunityRu(street) : cutCommunity(street)}</p> */}
                        <p>{street}</p>
                        <p>{community}</p>
                      </div>
                    </div>

                    <div className="propCard__card-main-bottom">
                      <span>{roomIcon.icon} {rooms} {t("room")}</span>
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
          <AiOutlineArrowRight className="scrollRight" onClick={() => scrollableDiv.scrollLeft += scroll} />
        </div>
        : <div className="propCardResult">
          {data?.map(({ id, home_id, photo, price, title, street, community, rooms, buildingType, surface }) => {
            return (
              <Link
                key={id}
                target={"_blank"}
                to={`/result/${id}`}
                className="propCardResult__card"
              >
                <div className="propCardResult__card-img" >
                  <img
                    src={
                      photo?.length
                        ? `${API_BASE_URL}/images/${photo[0]} `
                        : noImg
                    }
                    alt="HomeImg"
                  />
                </div>

                <div className="propCardResult__card-main">
                  <div className="propCardResult__card-main-top">
                    {exchange === 1 && ((price === "" || price === "0") ? <p>{t("contract")}</p> : <p>{usdFormater(price)}</p>)}
                    {exchange === 2 && ((price === "" || price === "0") ? <p>{t("contract")}</p> : <p>&#1423; {amdFormater(price, exchangeValue)}</p>)}
                    <span>ID {home_id}</span>
                  </div>

                  <div className="propCardResult__card-main-center">
                    <h5>{title}</h5>
                    <div className="propCardResult__card-main-center-geo">
                      <p>{street}</p>
                      <p>{community}</p>
                    </div>
                  </div>

                  <div className="propCardResult__card-main-bottom">
                    <span>{roomIcon.icon} {rooms} {t("room")}</span>
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


// const laptopSmall = useMediaQuery({ maxWidth: 1122 })

// const homeCut = laptop ? 27 : 30
// const resultCut = laptop ? 23 : 25

// const [showScrollLeft, setShowScrollLeft] = useState(false);

// useEffect(() => {
//   const scrollableDiv = scrollableDivRef.current;

//   const handleScroll = () => {
//     if (scrollableDiv) {
//       setShowScrollLeft(scrollableDiv.scrollLeft > 0);
//     }
//   };

//   if (scrollableDiv) {
//     scrollableDiv.addEventListener('scroll', handleScroll);
//   }

//   return () => {
//     if (scrollableDiv) {
//       scrollableDiv.removeEventListener('scroll', handleScroll);
//     }
//   };
// }, []);
