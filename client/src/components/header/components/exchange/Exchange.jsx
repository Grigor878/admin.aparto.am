import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getExchange } from "../../../../store/slices/homeSlice";
import { FaDollarSign } from "react-icons/fa";
import { TbCurrencyDram } from "react-icons/tb";
import { headerExchange } from "./data";
import cookies from "js-cookie";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import "./Exchange.scss";

const Exchange = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchange());
  }, [dispatch]);

  const cache = parseInt(cookies.get("exchange"));

  const exRef = useRef();
  const [openEx, setOpenEx] = useState(false);
  const [selectedEx, setSelectedex] = useState(
    cache !== 2
      ? {
          id: 1,
          symbol: <FaDollarSign className="exchange__flag" />,
        }
      : {
          id: 2,
          symbol: <TbCurrencyDram className="exchange__flag" />,
          value: "TbCurrencyDram",
        }
  );

  const handleOpenEx = () => {
    setOpenEx(!openEx);
  };

  const handleChangeEx = (id, symbol) => {
    setOpenEx(false);
    setSelectedex({ id, symbol });
    cookies.set("exchange", id);
  };

  useOutsideClick(exRef, openEx, setOpenEx);

  return (
    <div className="exchange" ref={exRef}>
      <div className="exchange__choose" onClick={handleOpenEx}>
        {selectedEx.symbol}
      </div>

      <ul
        className={!openEx ? "exchange__dropdown" : "exchange__dropdown-active"}
      >
        {headerExchange
          .filter((el) => el.id !== selectedEx.id)
          .map(({ id, symbol }) => (
            <li key={id} onClick={() => handleChangeEx(id, symbol)}>
              {symbol}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Exchange;
