import React from "react";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import { useTranslation } from "react-i18next";
import { ImgBlock } from "../../components/imgBlock/ImgBlock";
import image from "../../assets/imgs/buysell.png";
import buyers from "../../assets/imgs/buyer.png";
import sellers from "../../assets/imgs/seller.png";
import Contacts from "../../components/contacts/Contacts";
import { BottomBreadcrumb } from "../../components/breadcrumbs/BottomBreadcrumb";
import "./styles.scss";

const BuyOrSell = () => {
  const { t } = useTranslation();

  return (
    <section className="services">
      <HelmetAsync title="buy_sell_title" description="buy_sell_description" />
      <ImgBlock image={image} title="buy_sell_title" />

      <div className="contain">
        <div className="services_row">
          <div className="services_col wrap_reverse">
            <img src={buyers} alt="buyers" loading="lazy" />
            <div className="services_col_context">
              <h2>{t("buyer")}</h2>
              <p>{t("buyer_text")}</p>
            </div>
          </div>
          <hr />
          <div className="services_col wrap">
            <div className="services_col_context">
              <h2>{t("seller")}</h2>
              <p dangerouslySetInnerHTML={{ __html: t("seller_text") }} />
            </div>
            <img src={sellers} alt="sellers" loading="lazy" />
          </div>
        </div>
      </div>
      <BottomBreadcrumb />
      <Contacts />
    </section>
  );
};

export default BuyOrSell;
