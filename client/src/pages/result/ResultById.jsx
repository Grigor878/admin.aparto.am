import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getViewData } from "../../store/slices/viewSlice";
import { API_BASE_URL } from "../../apis/config";
import {
  balcony,
  buildType,
  buildingYear,
  checked,
  floorIcon,
  ground,
  kitchenType,
  location,
  mail,
  orentation,
  propertyType,
  seeAllImgs,
  square,
  tel,
} from "../../admin/svgs/svgs";
import { ReactFullscreenCarousel } from "react-fullscreen-carousel";
import { YMap } from "../../admin/pages/properties/components/yandexMap/YMap";
import { amdFormater, sqmToFt2, usdFormater } from "../../helpers/formatters";
import { PriceHistory } from "../../admin/pages/properties/components/priceHistory/PriceHistory";
import user from "../../assets/imgs/user.png";
import telegram from "../../assets/icons/telegram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import viber from "../../assets/icons/viber.png";
import { Loader } from "../../components/loader/Loader";
// import '../../admin/pages/properties/pages/Styles.scss'
import { getAdminData } from "../../store/slices/homeSlice";
import { useMediaQuery } from "react-responsive";
import "./Styles.scss";

const ResultById = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const { language, size, exchange, exchangeValue } = useSelector(
    (state) => state.home
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getViewData(id));
  }, [dispatch, id]);

  const { data, loading } = useSelector((state) => state.view);

  const [open, setOpen] = useState(false);
  const [startSlideIndex, setStartSlideIndex] = useState(0);

  const currentPropertyData = data[language];

  const currentPropertyPrice = data?.priceHistory;

  let embedURL = "";

  if (
    currentPropertyData &&
    currentPropertyData?.length !== 0 &&
    currentPropertyData[7]?.fields[1]?.value?.length &&
    currentPropertyData[7]?.fields[1]?.value?.includes(
      "https://www.youtube.com/"
    )
  ) {
    const url = currentPropertyData[7]?.fields[1]?.value;
    const videoID = url?.match(/(\?|&)v=([^&#]+)/)[2];
    embedURL = "https://www.youtube.com/embed/" + videoID;
  }

  const currentPropertyImgs = data?.photo;

  const modifiedData = currentPropertyImgs?.map((item) => ({
    img: `${API_BASE_URL}/images/${item.name}`,
    alt: item.name,
  }));

  useEffect(() => {
    dispatch(getAdminData());
  }, [dispatch]);

  const { admin } = useSelector((state) => state.home);
  const adminTel = admin?.phone?.tel1;

  const adminSocial = admin?.phone?.messengers;

  const laptop = useMediaQuery({ maxWidth: 1280 });
  const mobile = useMediaQuery({ maxWidth: 768 });

  const imgsShow = laptop ? 3 : 5;

  return loading ? (
    <Loader />
  ) : (
    currentPropertyData && currentPropertyData?.length !== 0 && (
      <article>
        <div className="contain">
          <div className="singleProperty">
            {mobile ? (
              <div className="singleProperty__content-left-title-right2">
                <p>
                  {data?.selectedTransactionType === "sale"
                    ? t("sale")
                    : t("rent")}
                </p>
                <span>ID {data?.home_id}</span>
              </div>
            ) : null}

            {!open ? (
              <div
                className="singleProperty__imgs"
                style={{
                  display:
                    !currentPropertyImgs || currentPropertyImgs?.length === 0
                      ? "none"
                      : "flex",
                }}
              >
                <div
                  className="singleProperty__imgs-left"
                  style={{ height: "100%" }}
                >
                  {currentPropertyImgs?.length !== 0 && modifiedData && (
                    <img
                      src={modifiedData[0]?.img}
                      loading="lazy"
                      alt={modifiedData[0]?.alt}
                      onClick={() => {
                        setOpen(true);
                        setStartSlideIndex(0);
                      }}
                    />
                  )}
                </div>

                {!mobile ? (
                  <div className="singleProperty__imgs-right">
                    {currentPropertyImgs?.length !== 0 &&
                      modifiedData
                        ?.slice(1, imgsShow)
                        ?.map(({ img, alt }, index) => (
                          <img
                            key={alt}
                            src={img}
                            loading="lazy"
                            alt={alt}
                            onClick={() => {
                              setOpen(true);
                              setStartSlideIndex(index + 1);
                            }}
                          />
                        ))}
                    <button
                      onClick={() => {
                        setOpen(true);
                        setStartSlideIndex(0);
                      }}
                    >
                      {seeAllImgs.icon} {t("see_all_images")}
                    </button>
                  </div>
                ) : (
                  <div className="singleProperty__imgs-right">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setStartSlideIndex(0);
                      }}
                    >
                      {seeAllImgs.icon} {t("see_all_images")}
                    </button>
                  </div>
                )}

                <span
                  style={{
                    display:
                      currentPropertyData[0]?.fields[4]?.value === t("regular")
                        ? "none"
                        : "block",
                    background:
                      currentPropertyData[0]?.fields[4]?.value === t("top")
                        ? "#2eaa50"
                        : currentPropertyData[0]?.fields[4]?.value ===
                          t("urgent")
                        ? "#4a46f1"
                        : "#e7e9f0",
                  }}
                >
                  {currentPropertyData[0]?.fields[4]?.value}
                </span>
              </div>
            ) : (
              <ReactFullscreenCarousel
                slides={modifiedData}
                handleClose={() => setOpen(false)}
                startSlideIndex={startSlideIndex}
              />
            )}

            <div className="singleProperty__content">
              {/* Left */}
              <div className="singleProperty__content-left">
                <div className="singleProperty__content-left-title">
                  <div className="singleProperty__content-left-title-left">
                    <h2 className="singleProperty__title">
                      {currentPropertyData[0]?.fields[2]?.value}
                    </h2>
                    <p>
                      {location.icon}
                      {
                        currentPropertyData[1]?.fields[0]?.communityStreet
                          ?.value
                      }
                      {", "}
                      {currentPropertyData[1]?.fields[0]?.value}
                      <span
                        onClick={() =>
                          window.scrollTo(0, document.body.scrollHeight)
                        }
                      >
                        {t("see_on_map")}
                      </span>
                    </p>
                  </div>

                  <div className="singleProperty__content-left-title-right">
                    <span>ID {data?.home_id}</span>
                    <p>
                      {data?.selectedTransactionType === "sale"
                        ? t("sale")
                        : t("rent")}
                    </p>
                  </div>
                </div>

                <div className="singleProperty__content-left-options">
                  <div>
                    {propertyType.icon}
                    {t("property_type")} -
                    <p>{currentPropertyData[0]?.fields[1]?.value}</p>
                  </div>
                  <div>
                    {square.icon}
                    {size === 1 ? (
                      <p>
                        {currentPropertyData[3]?.fields[0]?.value}{" "}
                        {t("square_symbol")}
                      </p>
                    ) : (
                      <p>
                        {sqmToFt2(currentPropertyData[3]?.fields[0]?.value)}{" "}
                        {t("ft_symbol")}
                      </p>
                    )}
                  </div>

                  {currentPropertyData[3]?.fields[8]?.value &&
                    currentPropertyData[3]?.fields[8]?.value !== 0 &&
                    currentPropertyData[4]?.fields[1]?.value &&
                    currentPropertyData[4]?.fields[1]?.value !== 0 && (
                      <div>
                        {floorIcon.icon}
                        <p>
                          {t("floor")}{" "}
                          {currentPropertyData[3]?.fields[8]?.value} /{" "}
                          {currentPropertyData[4]?.fields[1]?.value}
                        </p>
                      </div>
                    )}

                  {Number(currentPropertyData[3]?.fields[5]?.value) +
                    Number(currentPropertyData[3]?.fields[6]?.value) !==
                    0 && (
                    <div>
                      {balcony.icon}
                      <p>
                        {Number(currentPropertyData[3]?.fields[5]?.value) +
                          Number(currentPropertyData[3]?.fields[6]?.value)}
                      </p>{" "}
                      {t("balcony")}
                    </div>
                  )}

                  <div>
                    {buildType.icon}
                    {t("building_type")} -
                    <p>{currentPropertyData[4]?.fields[0]?.value}</p>
                  </div>

                  {currentPropertyData[4]?.fields[3]?.value && (
                    <div>
                      {buildingYear.icon}
                      {t("builded")}{" "}
                      <p>{currentPropertyData[4]?.fields[3]?.value}</p>
                    </div>
                  )}

                  <div>
                    {kitchenType.icon}
                    {t("kitchen_type")} -
                    <p>{currentPropertyData[3]?.fields[11]?.value}</p>
                  </div>

                  {currentPropertyData[4]?.fields[4]?.value && (
                    <div>
                      {orentation.icon}
                      {t("orentation")} -
                      <p>{currentPropertyData[4]?.fields[4]?.value}</p>
                    </div>
                  )}
                  {currentPropertyData[3]?.fields[7]?.value && (
                    <div>
                      {ground.icon}
                      {t("ground")} -
                      <p>{currentPropertyData[3]?.fields[7]?.value} ք.մ</p>
                    </div>
                  )}
                </div>

                <div className="singleProperty__content-left-desc">
                  <h3 className="singleProperty__subtitle">
                    {t("house_description")}
                  </h3>

                  <div className="singleProperty__content-left-desc-info">
                    {currentPropertyData[3]?.fields[2]?.value && (
                      <p>
                        {t("number_of_rooms")} -{" "}
                        <span>{currentPropertyData[3]?.fields[2]?.value}</span>
                      </p>
                    )}

                    {currentPropertyData[3]?.fields[3]?.value && (
                      <p>
                        {t("number_of_bedrooms")} -{" "}
                        <span>{currentPropertyData[3]?.fields[3]?.value}</span>
                      </p>
                    )}

                    {currentPropertyData[3]?.fields[4]?.value && (
                      <p>
                        {t("number_of_bathrooms")} -{" "}
                        <span>{currentPropertyData[3]?.fields[4]?.value}</span>
                      </p>
                    )}

                    {Number(currentPropertyData[3]?.fields[6]?.value) !== 0 && (
                      <p>
                        {t("number_of_closebalcony")} -{" "}
                        <span>{currentPropertyData[3]?.fields[6]?.value}</span>
                      </p>
                    )}

                    {Number(currentPropertyData[3]?.fields[5]?.value) !== 0 && (
                      <p>
                        {t("number_of_openbalcony")} -{" "}
                        <span>{currentPropertyData[3]?.fields[5]?.value}</span>
                      </p>
                    )}

                    <p>
                      {t("ceiling_height")} -{" "}
                      <span>
                        {currentPropertyData[3]?.fields[1]?.value} {t("meter")}
                      </span>
                    </p>
                  </div>

                  <p className="singleProperty__content-left-desc-text">
                    {currentPropertyData[0]?.fields[3]?.value}
                  </p>
                </div>

                {currentPropertyData[5]?.fields?.filter(
                  (el) => el.value === true
                )?.length > 0 ? (
                  <div className="singleProperty__content-left-facility">
                    <h3 className="singleProperty__subtitle">
                      {t("facilities")}
                    </h3>

                    <div className="singleProperty__content-left-facility-card">
                      {currentPropertyData[5]?.fields
                        ?.filter((el) => el.value === true)
                        ?.map(({ key, title }) => {
                          // if (title.endsWith('*')) {
                          //     title = title.slice(0, -1);
                          // }
                          return (
                            <p key={key}>
                              {checked.icon} {title}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                ) : null}

                {currentPropertyData[6]?.fields?.filter(
                  (el) => el.value === true
                )?.length > 0 ? (
                  <div className="singleProperty__content-left-otherFacility">
                    <h3 className="singleProperty__subtitle">
                      {t("other_facilities")}
                    </h3>

                    <div className="singleProperty__content-left-otherFacility-card">
                      {currentPropertyData[6]?.fields
                        ?.filter((el) => el.value === true)
                        ?.map(({ key, title }) => {
                          return (
                            <p key={key}>
                              {checked.icon} {title}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                ) : null}

                {currentPropertyData[7]?.fields[1]?.value?.length &&
                currentPropertyData[7]?.fields[1]?.value?.includes(
                  "https://www.youtube.com/"
                ) ? (
                  <div className="singleProperty__content-left-video">
                    <h3 className="singleProperty__subtitle">
                      {t("home_video")}
                    </h3>

                    <div className="singleProperty__content-left-video-card">
                      <iframe
                        width="853"
                        height="480"
                        src={embedURL}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="singleProperty__content-left-location">
                  {mobile && (
                    <div className="singleProperty__content-right">
                      <div className="singleProperty__content-right-price">
                        {/* {currentPropertyData[2]?.fields[0]?.value !== "" || currentPropertyData[2]?.fields[0]?.value === "0"
                        ? <h4>{t("price")}։
                          {exchange === 2
                            ? <span>&#1423; {amdFormater(currentPropertyData[2]?.fields[0]?.value, exchangeValue)}</span>
                            : <span>{usdFormater(currentPropertyData[2]?.fields[0]?.value)}</span>
                          }
                        </h4>
                        : <h4>{t("price")}։ <span>{t("contract")}</span></h4>
                      } */}

                        {exchange === 1 &&
                          (currentPropertyData[2]?.fields[0]?.value === "" ||
                          currentPropertyData[2]?.fields[0]?.value === "0" ? (
                            <h4>
                              {t("price")}։<span>{t("contract")}</span>
                            </h4>
                          ) : (
                            <h4>
                              {t("price")}։{" "}
                              <span>
                                {usdFormater(
                                  currentPropertyData[2]?.fields[0]?.value
                                )}
                              </span>
                            </h4>
                          ))}

                        {exchange === 2 &&
                          (currentPropertyData[2]?.fields[0]?.value === "" ||
                          currentPropertyData[2]?.fields[0]?.value === "0" ? (
                            <h4>
                              {t("price")}։<span>{t("contract")}</span>
                            </h4>
                          ) : (
                            <h4>
                              {t("price")}։{" "}
                              <span>
                                &#1423;{" "}
                                {amdFormater(
                                  currentPropertyData[2]?.fields[0]?.value,
                                  exchangeValue
                                )}
                              </span>
                            </h4>
                          ))}

                        {!currentPropertyData[2]?.fields[2]
                          ?.value ? null : exchange === 2 ? (
                          <p>
                            {t("first_pay")}:
                            <span>
                              &#1423;{" "}
                              {amdFormater(
                                currentPropertyData[2]?.fields[2]?.value,
                                exchangeValue
                              )}
                            </span>
                          </p>
                        ) : (
                          <p>
                            {t("first_pay")}:
                            <span>
                              {usdFormater(
                                currentPropertyData[2]?.fields[2]?.value
                              )}
                            </span>
                          </p>
                        )}

                        {!currentPropertyData[2]?.fields[1]
                          ?.value ? null : exchange === 2 ? (
                          <p>
                            {t("sqm_price")} :
                            <span>
                              &#1423;{" "}
                              {amdFormater(
                                currentPropertyData[2]?.fields[1]?.value,
                                exchangeValue
                              )}
                            </span>
                          </p>
                        ) : (
                          <p>
                            {t("sqm_price")} :
                            <span>
                              {usdFormater(
                                currentPropertyData[2]?.fields[1]?.value
                              )}
                            </span>
                          </p>
                        )}

                        <PriceHistory data={currentPropertyPrice} />

                        {currentPropertyData[2]?.fields[4]?.value && (
                          <>
                            <hr />
                            <p>
                              {t("payment_type")}։
                              {currentPropertyData[2]?.fields[4]?.value.includes(
                                ","
                              ) ? (
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {currentPropertyData[2]?.fields[4]?.value
                                    .split(",")
                                    .map((item, index) => (
                                      <span key={index}>{item.trim()}</span>
                                    ))}
                                </span>
                              ) : (
                                <span>
                                  {currentPropertyData[2]?.fields[4]?.value}
                                </span>
                              )}
                            </p>
                          </>
                        )}

                        {currentPropertyData[2]?.fields[5]?.value && (
                          <p>
                            {t("preferred_bank")}։
                            {currentPropertyData[2]?.fields[5]?.value.includes(
                              ","
                            ) ? (
                              <span
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {currentPropertyData[2]?.fields[5]?.value
                                  ?.split(",")
                                  ?.map((item, index) => (
                                    <span key={index}>{item.trim()}</span>
                                  ))}
                              </span>
                            ) : (
                              <span>
                                {currentPropertyData[2]?.fields[5]?.value}
                              </span>
                            )}
                          </p>
                        )}
                        <hr />
                        {currentPropertyData[4]?.fields[5]?.value && (
                          <p>
                            {t("tax_yearly")}։
                            <span>
                              $ {currentPropertyData[4]?.fields[5]?.value}
                            </span>
                          </p>
                        )}
                        {currentPropertyData[4]?.fields[6]?.value && (
                          <p>
                            {t("tax_monthly")}։
                            <span>
                              $ {currentPropertyData[4]?.fields[6]?.value}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="singleProperty__content-right-contact">
                        <h5>{t("contact_us")}</h5>

                        <div className="singleProperty__content-right-contact-social">
                          <div className="singleProperty__content-right-contact-social-card">
                            <span>
                              {mail.icon} {t("email")}
                            </span>
                            <p>info@aparto.am</p>
                          </div>

                          <div className="singleProperty__content-right-contact-social-bottom">
                            <div className="singleProperty__content-right-contact-social-card">
                              <span>
                                {tel.icon} {t("tel_number")}
                              </span>
                              {/* {adminTel && <p>{adminTel}</p>} */}
                              {adminTel && (
                                <a href={`tel:${adminTel}`}>
                                  <p>{adminTel}</p>
                                </a>
                              )}
                            </div>
                            <div className="singleProperty__content-right-contact-social-card">
                              <div style={{ display: "flex", gap: "16px" }}>
                                <img src={telegram} alt="telegram" />
                                <img src={whatsapp} alt="whatsapp" />
                                <img src={viber} alt="viber" />
                              </div>
                              {/* {adminSocial && <p>{adminSocial}</p>} */}
                              {adminSocial && (
                                <a href={`tel:${adminSocial}`}>
                                  <p>{adminSocial}</p>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="singleProperty__content-right-contact-info">
                          <img
                            src={
                              currentPropertyData[11]?.fields[0]?.photo
                                ? API_BASE_URL +
                                  "/images/" +
                                  currentPropertyData[11]?.fields[0]?.photo
                                : user
                            }
                            alt="img"
                          />

                          <div className="singleProperty__content-right-contact-info-name">
                            {/* <p>{t("name_surname")}</p> */}
                            <p>{currentPropertyData[11]?.fields[0]?.value}</p>
                            <span>{t("agent")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <p>
                    {location.icon}
                    {currentPropertyData[1]?.fields[0]?.communityStreet?.value}
                    {", "}
                    {currentPropertyData[1]?.fields[0]?.value}
                  </p>

                  <div className="singleProperty__content-left-location-map">
                    <YMap
                      width="100%"
                      height="395px"
                      value={currentPropertyData[1]?.fields[4]?.value}
                    />
                  </div>
                </div>
              </div>

              {/* Right */}
              {!mobile && (
                <div className="singleProperty__content-right">
                  <div className="singleProperty__content-right-price">
                    {/* {currentPropertyData[2]?.fields[0]?.value !== "" || currentPropertyData[2]?.fields[0]?.value === "0"
                    ? <h4>{t("price")}։
                      {exchange === 2
                        ? <span>&#1423; {amdFormater(currentPropertyData[2]?.fields[0]?.value, exchangeValue)}</span>
                        : <span>{usdFormater(currentPropertyData[2]?.fields[0]?.value)}</span>
                      }
                    </h4>
                    : <h4>{t("price")}։ <span>{t("contract")}</span></h4>
                  } */}

                    {exchange === 1 &&
                      (currentPropertyData[2]?.fields[0]?.value === "" ||
                      currentPropertyData[2]?.fields[0]?.value === "0" ? (
                        <h4>
                          {t("price")}։<span>{t("contract")}</span>
                        </h4>
                      ) : (
                        <h4>
                          {t("price")}։{" "}
                          <span>
                            {usdFormater(
                              currentPropertyData[2]?.fields[0]?.value
                            )}
                          </span>
                        </h4>
                      ))}

                    {exchange === 2 &&
                      (currentPropertyData[2]?.fields[0]?.value === "" ||
                      currentPropertyData[2]?.fields[0]?.value === "0" ? (
                        <h4>
                          {t("price")}։<span>{t("contract")}</span>
                        </h4>
                      ) : (
                        <h4>
                          {t("price")}։{" "}
                          <span>
                            &#1423;{" "}
                            {amdFormater(
                              currentPropertyData[2]?.fields[0]?.value,
                              exchangeValue
                            )}
                          </span>
                        </h4>
                      ))}

                    {!currentPropertyData[2]?.fields[2]
                      ?.value ? null : exchange === 2 ? (
                      <p>
                        {t("first_pay")}:
                        <span>
                          &#1423;{" "}
                          {amdFormater(
                            currentPropertyData[2]?.fields[2]?.value,
                            exchangeValue
                          )}
                        </span>
                      </p>
                    ) : (
                      <p>
                        {t("first_pay")}:
                        <span>
                          {usdFormater(
                            currentPropertyData[2]?.fields[2]?.value
                          )}
                        </span>
                      </p>
                    )}

                    {!currentPropertyData[2]?.fields[1]
                      ?.value ? null : exchange === 2 ? (
                      <p>
                        {t("sqm_price")} :
                        <span>
                          &#1423;{" "}
                          {amdFormater(
                            currentPropertyData[2]?.fields[1]?.value,
                            exchangeValue
                          )}
                        </span>
                      </p>
                    ) : (
                      <p>
                        {t("sqm_price")} :
                        <span>
                          {usdFormater(
                            currentPropertyData[2]?.fields[1]?.value
                          )}
                        </span>
                      </p>
                    )}

                    <PriceHistory data={currentPropertyPrice} />

                    {currentPropertyData[2]?.fields[4]?.value && (
                      <>
                        <hr />
                        <p>
                          {t("payment_type")}։
                          {currentPropertyData[2]?.fields[4]?.value.includes(
                            ","
                          ) ? (
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {currentPropertyData[2]?.fields[4]?.value
                                .split(",")
                                .map((item, index) => (
                                  <span key={index}>{item.trim()}</span>
                                ))}
                            </span>
                          ) : (
                            <span>
                              {currentPropertyData[2]?.fields[4]?.value}
                            </span>
                          )}
                        </p>
                      </>
                    )}

                    {currentPropertyData[2]?.fields[5]?.value && (
                      <p>
                        {t("preferred_bank")}։
                        {currentPropertyData[2]?.fields[5]?.value.includes(
                          ","
                        ) ? (
                          <span
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {currentPropertyData[2]?.fields[5]?.value
                              ?.split(",")
                              ?.map((item, index) => (
                                <span key={index}>{item.trim()}</span>
                              ))}
                          </span>
                        ) : (
                          <span>
                            {currentPropertyData[2]?.fields[5]?.value}
                          </span>
                        )}
                      </p>
                    )}
                    <hr />
                    {currentPropertyData[4]?.fields[5]?.value && (
                      <p>
                        {t("tax_yearly")}։
                        <span>
                          $ {currentPropertyData[4]?.fields[5]?.value}
                        </span>
                      </p>
                    )}
                    {currentPropertyData[4]?.fields[6]?.value && (
                      <p>
                        {t("tax_monthly")}։
                        <span>
                          $ {currentPropertyData[4]?.fields[6]?.value}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="singleProperty__content-right-contact">
                    <h5>{t("contact_us")}</h5>

                    <div className="singleProperty__content-right-contact-social">
                      <div className="singleProperty__content-right-contact-social-card">
                        <span>
                          {mail.icon} {t("email")}
                        </span>
                        <p>info@aparto.am</p>
                      </div>

                      <div className="singleProperty__content-right-contact-social-bottom">
                        <div className="singleProperty__content-right-contact-social-card">
                          <span>
                            {tel.icon} {t("tel_number")}
                          </span>
                          {/* {adminTel && <p>{adminTel}</p>} */}
                          {adminTel && (
                            <a href={`tel:${adminTel}`}>
                              <p>{adminTel}</p>
                            </a>
                          )}
                        </div>
                        <div className="singleProperty__content-right-contact-social-card">
                          <div style={{ display: "flex", gap: "16px" }}>
                            <img src={telegram} alt="telegram" />
                            <img src={whatsapp} alt="whatsapp" />
                            <img src={viber} alt="viber" />
                          </div>
                          {/* {adminSocial && <p>{adminSocial}</p>} */}
                          {adminSocial && (
                            <a href={`tel:${adminSocial}`}>
                              <p>{adminSocial}</p>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="singleProperty__content-right-contact-info">
                      <img
                        src={
                          currentPropertyData[11]?.fields[0]?.photo
                            ? API_BASE_URL +
                              "/images/" +
                              currentPropertyData[11]?.fields[0]?.photo
                            : user
                        }
                        alt="img"
                      />

                      <div className="singleProperty__content-right-contact-info-name">
                        {/* <p>{t("name_surname")}</p> */}
                        <p>{currentPropertyData[11]?.fields[0]?.value}</p>
                        <span>{t("agent")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    )
  );
};

export default ResultById;

/*{ {!open
              ? <div
                className='singleProperty__imgs'
                style={{ display: !currentPropertyImgs || currentPropertyImgs?.length === 0 ? "none" : "flex" }}
              >
                <div className='singleProperty__imgs-left' style={{ height: "100%" }}>
                  {currentPropertyImgs?.length !== 0 && modifiedData &&
                    <img
                      src={modifiedData[0]?.img}
                      loading='lazy'
                      alt={modifiedData[0]?.alt}
                    />
                  }
                </div>

                {!mobile
                  ? <div className='singleProperty__imgs-right'>
                    {currentPropertyImgs?.length !== 0 && modifiedData?.slice(1, imgsShow)?.map(({ img, alt }) => {
                      return (
                        <img
                          key={alt}
                          src={img}
                          loading='lazy'
                          alt={alt}
                        />
                      )
                    })}
                    <button
                      onClick={() => setOpen(true)}
                    >
                      {seeAllImgs.icon} {t('see_all_images')}
                    </button>
                  </div>
                  : <div className='singleProperty__imgs-right'>
                    <button
                      onClick={() => setOpen(true)}
                    >
                      {seeAllImgs.icon} {t('see_all_images')}
                    </button>
                  </div>
                }

                <span
                  style={{
                    display: currentPropertyData[0]?.fields[4]?.value === t("regular") ? "none" : "block",
                    background: currentPropertyData[0]?.fields[4]?.value === t("top")
                      ? "#2eaa50"
                      : currentPropertyData[0]?.fields[4]?.value === t("urgent")
                        ? "#4a46f1" : "#e7e9f0"
                  }}
                >{currentPropertyData[0]?.fields[4]?.value}
                </span>

              </div>
              : <ReactFullscreenCarousel
                slides={modifiedData}
                handleClose={() => setOpen(false)}
                startSlideIndex={0}
              />
            } }*/
