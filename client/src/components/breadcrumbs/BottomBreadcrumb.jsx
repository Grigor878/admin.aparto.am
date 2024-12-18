import React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { slash } from "../../assets/svgs/svgs";
import "./styles.scss";

export const BottomBreadcrumb = () => {
  const { t, i18n } = useTranslation();
  const smallMobile = useMediaQuery({ maxWidth: 541 });

  return (
    <div className="bottomBreadcrumb">
      <div className="contain">
        <div className="bottomBreadcrumb_main">
          <h5>{t("header_service")}</h5>

          <ul className="breadcrumb flexable">
            <li>
              <NavLink
                className="breadcrumb_link flexable_link"
                to={`/${i18n.language}/services/buying_selling`}
              >
                {t("buy_sell_title")}
                {!smallMobile && slash.icon}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="breadcrumb_link flexable_link"
                to={`/${i18n.language}/services/rental_in_yerevan`}
              >
                {t("rental_title")}
                {!smallMobile && slash.icon}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="breadcrumb_link flexable_link"
                to={`/${i18n.language}/services/property_management`}
              >
                {t("management_title")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
