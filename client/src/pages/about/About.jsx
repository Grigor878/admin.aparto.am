import React from "react";
import HelmetAsync from "../../components/helmetAsync/HelmetAsync";
import { useNavigate } from "react-router-dom";
import Faq from "../home/components/faq/Faq";
import Contacts from "../../components/contacts/Contacts";
import { ImgBlock } from "../../components/imgBlock/ImgBlock";
import image from "../../assets/imgs/aboutMain.png";
import { useTranslation } from "react-i18next";
import about1 from "../../assets/imgs/about1.png";
import about2 from "../../assets/imgs/about2.png";
import about3 from "../../assets/imgs/about3.png";

import aboutChoose from "../../assets/imgs/about_choose.png";
import aboutChoose2 from "../../assets/imgs/about_choose2.png";
import aboutChoose3 from "../../assets/imgs/about_choose3.png";

import member from "../../assets/imgs/member.png";
import member2 from "../../assets/imgs/member2.png";
import member3 from "../../assets/imgs/member3.png";
import "./About.scss";
import { Breadcrumb } from "../../components/breadcrumbs/Breadcrumb";

const About = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  return (
    <section className="about">
      <HelmetAsync title="header_about" description="about_description" />
      <ImgBlock image={image} title="about_title" />

      <div className="contain">
        <div className="about_top">
          <Breadcrumb />
          <div className="about_intro">
            <img src={about1} alt="introduction_image" loading="lazy" />
            <div className="about_intro_text">
              <h2>{t("introduction")}</h2>
              <p>{t("introduction_text")}</p>
            </div>
          </div>
        </div>

        <div className="about_story">
          <h2>{t("story")}</h2>
          <p>{t("story_text")}</p>
          <p>{t("story_text2")}</p>
        </div>

        <div className="about_imgs">
          <img src={about2} alt="about_image2" loading="lazy" />
          <img src={about3} alt="about_image3" loading="lazy" />
        </div>

        <div className="about_members">
          <h2>{t("about_happy")}</h2>

          <div className="about_members_row">
            <div className="about_members_col">
              <img src={member} alt="member_image" loading="lazy" />
              <div>
                <h4>Fergus O'Reilly</h4>
                <p>Real Estate Agent</p>
              </div>
            </div>
            <div className="about_members_col">
              <img src={member2} alt="member2_image" loading="lazy" />
              <div>
                <h4>Rebecca Powell</h4>
                <p>Real Estate Agent</p>
              </div>
            </div>
            <div className="about_members_col">
              <img src={member3} alt="member3_image" loading="lazy" />
              <div>
                <h4>Warren Stewart</h4>
                <p>Real Estate Agent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about_choose">
          <h2>{t("about_choose")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t("about_choose_text") }} />

          <div className="about_choose_imgs">
            <img src={aboutChoose} alt="about_choose_image" loading="lazy" />
            <img src={aboutChoose2} alt="about_choose_image2" loading="lazy" />
            <img src={aboutChoose3} alt="about_choose_image3" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="contain">
        <div className="about_block">
          <h3>{t("about_ready")}</h3>
          <button onClick={() => navigate(`/${i18n.language}/contact-us`)}>
            {t("header_contact")}
          </button>
        </div>
        <Faq />
      </div>
      <Contacts />
    </section>
  );
};

export default About;
