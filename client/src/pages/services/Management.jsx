import React from "react";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import { useTranslation } from "react-i18next";
import { ImgBlock } from "../../components/imgBlock/ImgBlock";
import image from "../../assets/imgs/management.png";
import propmanagement from "../../assets/imgs/propmanagement.png";
import Contacts from "../../components/contacts/Contacts";
import { BottomBreadcrumb } from "../../components/breadcrumbs/BottomBreadcrumb";
import "./styles.scss";
import "./styles.scss";

const Management = () => {
  const { t } = useTranslation();

  return (
    <section className="services">
      <HelmetAsync
        title="management_title"
        description="management_description"
      />
      <ImgBlock image={image} title="management_title" />
      <div className="contain">
        <div className="services_row">
          <div className="services_col wrap">
            <div className="services_col_context">
              <h2>{t("management")}</h2>
              <p>{t("management_text")}</p>
            </div>
            <img
              src={propmanagement}
              alt="property_management"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <BottomBreadcrumb />
      <Contacts />
    </section>
  );
};

export default Management;
