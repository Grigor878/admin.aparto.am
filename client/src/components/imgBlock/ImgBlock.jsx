import React from "react";
import "./ImgBlock.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ImgBlock = ({ action, image, title }) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handle = () => {
    action ? action() : navigate(`/${i18n.language}/contact-us`);
  };

  return (
    <div className="imgBlock" style={{ backgroundImage: `url(${image})` }}>
      <div className="imgBlock_contain">
        <div className="imgBlock_about">
          <h1>{t(title)}</h1>

          <button onClick={handle} className="imgBlock_btn">
            {t("header_contact")}
          </button>
        </div>
      </div>
    </div>
  );
};
