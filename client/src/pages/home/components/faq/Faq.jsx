import React from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "./component/Accordion";
import "./Faq.scss";
import { NavLink } from "react-router-dom";

const Faq = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="faq">
      <div className="faq__left">
        <h2 className="title">{t("faq_title")}</h2>

        <div className="faq__left-text">
          <p>{t("faq_text")}</p>
          <NavLink to={`/${i18n.language}/contact-us`}>
            {t("header_contact")}
          </NavLink>
        </div>
      </div>

      <div className="faq__right">
        <Accordion />
      </div>
    </div>
  );
};

export default Faq;
