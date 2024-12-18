import React, { useRef, useState } from "react";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import Contacts from "../../components/contacts/Contacts";
import { useSelector } from "react-redux";
import { mail, tel } from "../../assets/svgs/svgs";
import { ImgBlock } from "../../components/imgBlock/ImgBlock";
import image from "../../assets/imgs/contactMain.png";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../components/breadcrumbs/Breadcrumb";
import emailjs from "@emailjs/browser";
import { error, success } from "../../components/alerts/alerts";
import "./Contact.scss";

const Contact = () => {
  const { t } = useTranslation();
  const { admin } = useSelector((state) => state.home);

  const form = useRef();
  const contactContextRef = useRef(null);

  const phone = admin?.phone?.tel1;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [subject, setSubject] = useState("");

  const handleScroll = () => {
    const offset = -110;
    const elementPosition =
      contactContextRef?.current?.getBoundingClientRect()?.top +
      window?.scrollY;
    window?.scrollTo({ top: elementPosition + offset, behavior: "smooth" });
  };

  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      });
      success(t("success"));
    } catch (err) {
      error(`Error - ${err?.text}`);
    } finally {
      setFullname("");
      setEmail("");
      setTelephone("");
      setSubject("");
    }
  };

  return (
    <section className="contact">
      <HelmetAsync title="header_contact" description="contact_description" />
      <ImgBlock action={handleScroll} image={image} title="contact_title" />
      <div className="contain">
        <div className="contact_main" ref={contactContextRef}>
          <Breadcrumb />

          <div className="contact_context">
            <form onSubmit={sendEmail} ref={form}>
              <input
                type="text"
                placeholder={t("fullname")}
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="email"
                placeholder={t("email")}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder={t("tel_number")}
                name="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <textarea
                style={{ height: "120px" }}
                placeholder={t("subject")}
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></textarea>

              <button type="submit" className="contact_btn">
                {t("request")}
              </button>
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
