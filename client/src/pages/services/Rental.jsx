import React from "react";
import Contacts from "../../components/contacts/Contacts";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import { useTranslation } from "react-i18next";
import { ImgBlock } from "../../components/imgBlock/ImgBlock";
import image from "../../assets/imgs/rental.png";
import tenants from "../../assets/imgs/tenants.png";
import landlord from "../../assets/imgs/landlord.png";
import { BottomBreadcrumb } from "../../components/breadcrumbs/BottomBreadcrumb";
import "./styles.scss";

const Rental = () => {
  const { t } = useTranslation();

  return (
    <section className="services">
      <HelmetAsync title="rental_title" description="rental_description" />
      <ImgBlock image={image} title="rental_title" />

      <div className="contain">
        <div className="services_row">
          <div className="services_col">
            <img src={tenants} alt="tenants" loading="lazy" />
            <div className="services_col_context">
              <h3>{t("tenants")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("tenants_text") }} />
            </div>
          </div>
          <hr />
          <div className="services_col">
            <div className="services_col_context">
              <h3>{t("landlords")}</h3>
              <p>{t("landlords_text")}</p>
              <p dangerouslySetInnerHTML={{ __html: t("") }} />
            </div>
            <img src={landlord} alt="landlord" loading="lazy" />
          </div>
        </div>
      </div>
      <BottomBreadcrumb />
      <Contacts />
    </section>
  );
};

export default Rental;
