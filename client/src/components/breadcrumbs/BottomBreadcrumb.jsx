import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import { slash } from "../../admin/svgs/svgs";

export const BottomBreadcrumb = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="bottomBreadcrumb">
      <div className="contain">
        <div className="bottomBreadcrumb_main">
          <h5>{t("header_service")}</h5>

          <ul className="breadcrumb">
            <li>
              <NavLink
                className="breadcrumb_link"
                to={`/${i18n.language}/services/buying_selling`}
              >
                {t("buy_sell_title")}
              </NavLink>
            </li>
            <li>{slash.icon}</li>
            <li>
              <NavLink
                className="breadcrumb_link"
                to={`/${i18n.language}/services/rental_in_yerevan`}
              >
                {t("rental_title")}
              </NavLink>
            </li>
            <li>{slash.icon}</li>
            <li>
              <NavLink
                className="breadcrumb_link"
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
