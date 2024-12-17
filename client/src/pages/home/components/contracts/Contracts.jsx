import React from "react";
import { useTranslation } from "react-i18next";
import { PdfSwitcher } from "./component/PdfSwitcher";
import { NavLink } from "react-router-dom";
import "./Contracts.scss";

const Contracts = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="contracts">
      <div className="contracts__context">
        <h3>{t("contracts_title")}</h3>
        <NavLink to={`/${i18n.language}/contact-us`}>
          {t("contracts_btn")}
        </NavLink>
      </div>

      <PdfSwitcher />
    </div>
  );
};

export default Contracts;
