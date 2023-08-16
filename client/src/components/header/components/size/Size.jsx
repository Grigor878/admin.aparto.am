import React, { useRef, useState } from "react";
import { sizeData } from "./data";
import cookies from "js-cookie";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import "./Size.scss";

const Size = () => {
  const sizeRef = useRef();

  const cache = parseInt(cookies.get("sizeUnit"));

  const [openSize, setOpenSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    cache !== 2
      ? {
          id: 1,
          icon: (
            <p className="size__unit">
              m<sup>2</sup>
            </p>
          ),
        }
      : {
          id: 2,
          icon: (
            <p className="size__unit">
              ft<sup>2</sup>
            </p>
          ),
        }
  );

  const handleChangeSize = (id, icon) => {
    setOpenSize(false);
    setSelectedSize({ id: id, icon: icon });
    cookies.set("sizeUnit", id);
  };

  useOutsideClick(sizeRef, openSize, setOpenSize);

  return (
    <div className="size" ref={sizeRef}>
      <div className="size__choose" onClick={() => setOpenSize(!openSize)}>
        {selectedSize.icon}
      </div>

      <ul className={!openSize ? "size__dropdown" : "size__dropdown-active"}>
        {sizeData
          .filter((el) => el.id !== selectedSize.id)
          .map(({ id, icon }) => (
            <li key={id} onClick={() => handleChangeSize(id, icon)}>
              {icon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Size;
