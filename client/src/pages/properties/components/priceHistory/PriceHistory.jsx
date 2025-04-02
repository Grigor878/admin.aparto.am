import React, { useState } from "react";
import { amdFormater, usdFormater } from "../../../../helpers/formatters";
import { down, up } from "../../../../admin/svgs/svgs";
import { useSelector } from "react-redux";
import "../../pages/Styles.scss";

export const PriceHistory = ({ data }) => {
  const [price, setPrice] = useState(true);

  const { exchange, exchangeValue } = useSelector((state) => state.home);

  return (
    <div className="priceHistory" onClick={() => setPrice(!price)}>
      <p>
        "Գնի պատմություն ։"
        {price ? down.icon : up.icon}
      </p>

      <div className={price ? "priceHistory-list" : "priceHistory-listActive"}>
        {!data || data?.length === 0 ? (
          <div className="priceHistory-listActive-view">
            <p>Փոփոխություններ առկա չեն։</p>
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
