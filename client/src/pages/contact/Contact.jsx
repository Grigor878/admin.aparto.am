import React, { useRef } from "react";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import Contacts from "../../components/contacts/Contacts";
import { useSelector } from "react-redux";
import { mail, tel } from "../../assets/svgs/svgs";
import { ImgBlock } from "../../components/imgBlock/ImgBlock";
import image from "../../assets/imgs/contactMain.png";
import "./Contact.scss";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../components/breadcrumbs/Breadcrumb";

const Contact = () => {
  const { t } = useTranslation();

  const { admin } = useSelector((state) => state.home);

  const phone = admin?.phone?.tel1;

  const contactContextRef = useRef(null);

  const handleScroll = () => {
    const offset = -110;
    const elementPosition =
      contactContextRef?.current?.getBoundingClientRect()?.top +
      window?.scrollY;
    window?.scrollTo({ top: elementPosition + offset, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="contact">
      <HelmetAsync title="header_contact" description="contact_description" />
      <ImgBlock action={handleScroll} image={image} title="contact_title" />
      <div className="contain">
        <div className="contact_main" ref={contactContextRef}>
          <Breadcrumb />

          <div className="contact_context">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder={t("fullname")} />
              <input type="email" placeholder={t("email")} />
              <input type="text" placeholder={t("tel_number")} />
              <textarea
                style={{ height: "120px" }}
                placeholder={t("subject")}
              ></textarea>

              <button className="contact_btn">{t("request")}</button>
              <span>{t("privacy")}</span>
            </form>

            <div className="contact_context_all">
              <h2>{t("contact_subtitle")}</h2>
              <h4>{t("contact_span")}</h4>
              <p>{t("contact_text")}</p>

              <div className="contact_context_social">
                {phone && (
                  <a href={`tel:${phone}`}>
                    {tel.icon} {phone}
                  </a>
                )}
                <a href="mailto:info@aparto.am">{mail.icon}info@aparto.am</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contacts />
    </section>
  );
};

export default Contact;
