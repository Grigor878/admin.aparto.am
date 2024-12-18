import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { slash } from "../../assets/svgs/svgs";
import "./styles.scss";

export const Breadcrumb = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  return (
    <ul className="breadcrumb">
      <li>
        <NavLink className="breadcrumb_link" to={`/${i18n.language}`} end>
          {t("home")}
        </NavLink>
      </li>
      <li>{slash.icon}</li>
      {pathname?.includes("contact-us") ? (
        <li>
          <NavLink
            className="breadcrumb_link"
            to={`/${i18n.language}/contact-us`}
          >
            {t("header_contact")}
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            className="breadcrumb_link"
            to={`/${i18n.language}/about-us`}
          >
            {t("header_about")}
          </NavLink>
        </li>
      )}
    </ul>
  );
};

// {/* <li className="breadcrumb_link_active">{t("header_contact")}</li> */}
