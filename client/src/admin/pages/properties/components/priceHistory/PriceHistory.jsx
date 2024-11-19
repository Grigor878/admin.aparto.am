import React, { useState } from "react";
import { amdFormater, usdFormater } from "../../../../../helpers/formatters";
import { down, up } from "../../../../svgs/svgs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "../../pages/Styles.scss";

export const PriceHistory = ({ data }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [price, setPrice] = useState(true);
  console.log(pathname);

  const { exchange, exchangeValue } = useSelector((state) => state.home);

  return (
    <div className="priceHistory" onClick={() => setPrice(!price)}>
      <p>
        {pathname?.includes("dashboard")
          ? "Գնի պատմություն ։"
          : t("price_history")}{" "}
        {price ? down.icon : up.icon}
      </p>

      <div className={price ? "priceHistory-list" : "priceHistory-listActive"}>
        {!data || data?.length === 0 ? (
          <div className="priceHistory-listActive-view">
            <p>{t("no_changes")}</p>
          </div>
        ) : (
          data?.map(({ price, date }) => {
            return (
              <div className="priceHistory-listActive-view" key={date + price}>
                {exchange === 1 && <p>{usdFormater(price)} </p>}
                {exchange === 2 && (
                  <p>&#1423; {amdFormater(price, exchangeValue)} </p>
                )}
                <p>{date}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
