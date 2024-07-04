import React from "react";
import { useTranslation } from "react-i18next";
import { search } from "../../../../assets/svgs/svgs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import cookies from "js-cookie";
import { usdFormater } from "../../../../helpers/formatters";
import {
  clearSidertData,
  postSearchData,
  setPage,
} from "../../../../store/slices/viewSlice";
import {
  addPrice,
  addPropertyType,
  addRooms,
  addTransactionType,
} from "../../../../store/slices/homeSlice";
import "./Searches.scss";

const Searches = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.home);
  const { paginatePage, perPage } = useSelector((state) => state.view);
  const mobile = useMediaQuery({ maxWidth: 768 });

  const navigate = useNavigate();

  // const searchHistory = JSON.parse(cookies.get("searchHistory") || "[]");
  const searchHistory = mobile
    ? JSON.parse(cookies.get("searchHistory") || "[]")
    : JSON.parse(cookies.get("searchHistory") || "[]")?.slice(-6);

  const handleSearch = (type, community, propertyType, rooms, price) => {
    const searchData = [
      { type },
      { community },
      { propertyType },
      { rooms },
      { price },
      { page: paginatePage },
      { perPage: perPage },
    ];
    dispatch(addTransactionType(type));
    dispatch(addPropertyType(propertyType));
    dispatch(addRooms(rooms));
    dispatch(addPrice(price));
    dispatch(clearSidertData());
    dispatch(setPage("home"));
    dispatch(postSearchData({ searchData, language })).then(() => {
      navigate("/result");
    });
  };

  return (
    searchHistory?.length > 0 && (
      <div className="searches block">
        <h2 className="title">{t("searches")}</h2>
        <div
          className={
            mobile ? "searches__row searches__row-mobile" : "searches__row"
          }
        >
          {searchHistory?.map(
            ({ id, type, community, propertyType, price, rooms }) => {
              return (
                <div
                  key={id}
                  className="searches__col"
                  onClick={() =>
                    handleSearch(type, community, propertyType, rooms, price)
                  }
                >
                  {search.icon}
                  <div className="searches__col-context">
                    <p>
                      {propertyType
                        .map((type) => {
                          return type === "house"
                            ? t("house")
                            : type === "privateHouse"
                            ? t("private_house")
                            : type === "commercial"
                            ? t("commercial")
                            : null;
                        })
                        .join(",")}
                      {"  "}
                      {type === "sale"
                        ? t("sale").toLowerCase()
                        : t("rent").toLowerCase()}
                    </p>
                    <span>
                      {community?.map((el, index) =>
                        index > 0 ? `,${el}` : el
                      )}

                      {rooms?.length > 0 && (
                        <>
                          {community?.length > 0 && " | "}
                          {language === "en"
                            ? t("number_of_bedrooms")
                            : t("number_of_rooms")}{" "}
                          {rooms?.map((el, index) =>
                            index > 0 ? `,${el}` : el
                          )}
                        </>
                      )}

                      {(price && community?.length > 0) ||
                      (price && rooms?.length > 0)
                        ? ` | ${usdFormater(price)}`
                        : price
                        ? ` ${usdFormater(price)}`
                        : null}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    )
  );
};

export default Searches;

// .join('')

// {/* {propertyType?.length || transactionType ?
//                     <div className="searches__col">
//                         {search.icon}

//                         <div className="searches__col-context" >
//                             <p>{propertyType[0] === "house" ? t("house")
//                                 : propertyType[0] === "privateHouse" ? t("private_house")
//                                     : propertyType[0] === "commercial" ? t("commercial") : null}
//                                 {"  "}
//                                 {transactionType === "sale" ? t("sale").toLowerCase() : t("rent").toLowerCase()}
//                             </p>
//                             <span></span>
//                         </div>
//                     </div>
//                     : null} */}

// {/* {room?.length
//                     ? <div className="searches__col">
//                         {search.icon}

//                         <div className="searches__col-context" >
//                             <p>{language === "en" ? t("number_of_bedrooms") : t("number_of_rooms")}</p>
//                             <span>{room.map((el, index) => (
//                                 <div key={index}>{el}</div>
//                             ))}</span>
//                         </div>
//                     </div>
//                     : null}

//                 {price && <div className="searches__col">
//                     {search.icon}

//                     <div className="searches__col-context" >
//                         <p>{t("price")}</p>
//                         <span>{usdFormater(price)}</span>
//                     </div>
//                 </div>} */}
