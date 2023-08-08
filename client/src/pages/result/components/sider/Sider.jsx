import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cookies from "js-cookie";
import { filterClose } from '../../../../assets/svgs/svgs'
import { Radio } from '../inputs/radio'
import { Checkbox } from '../inputs/checkbox'
import { communityAm, communityEn, communityRu } from './data'
import baseApi from '../../../../apis/baseApi';
import './Sider.scss'

export const Sider = ({ open, setOpen, radio, setRadio }) => {
  const { t } = useTranslation()

  const [selecteds, setSelecteds] = useState([])
  const [streetData, setStreetData] = useState([])

  const lang = cookies.get("i18next")

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelecteds((prev) => [...prev, id]);
    } else {
      setSelecteds((prev) => prev.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    // fetch streets by community
    baseApi.post(`api/getCommunitySearch/${lang}`, { "ids": selecteds })
      .then(res => {
        setStreetData(res.data);
      })
      .catch(err => alert(err.message))
  }, [lang, selecteds])

  // console.log(streetData);

  return (
    open &&
    <div className='sider'>
      <div className='sider__main'>
        <div className='sider__title'>
          <h6>{t("filters")}</h6>

          <div className='sider__title-btns'>
            <button onClick={() => alert("Clear!")}>
              {t("clear")}
            </button>

            <button onClick={() => setOpen(false)}>
              {filterClose.icon}
            </button>
          </div>
        </div>

        <div className='sider__transaction sider__block'>
          <h5>{t("transactionType")}</h5>

          <div className='sider__transaction-radios'>
            <Radio
              id="result_radio"
              text={t("sale")}
              checked={radio === "sale"}
              onChange={() => setRadio("sale")}
            />
            <Radio
              id="result_radio"
              text={t("rent")}
              checked={radio === "rent"}
              onChange={() => setRadio("rent")}
            />
          </div>
        </div>

        <div className='sider__property sider__block'>
          <h5>{t("propertyType")}</h5>

          <div className='sider__property-checkboxes'>
            <Checkbox
              // onChange={() => alert("checked")}
              text={t("house")}
            />
            <Checkbox
              // onChange={() => alert("checked")}
              text={t("private_house")}
            />
            <Checkbox
              // onChange={() => alert("checked")}
              text={t("commertial")}
            />
          </div>
        </div>

        <div className='sider__community sider__block'>
          <h5>{t("community")}</h5>

          <div className='sider__community-checkboxes'>
            {lang === "am" ? communityAm.map(({ id, value }) => {
              return (
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, id)}
                  key={id}
                  text={value}
                />
              )
            })
              : lang === "en" ? communityEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(e, id)}
                    key={id}
                    text={value}
                  />
                )
              })
                : communityRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handleCheckboxChange(e, id)}
                      key={id}
                      text={value}
                    />
                  )
                })}
          </div>
        </div>
      </div>

    </div>
  )
}
