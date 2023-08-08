import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cookies from "js-cookie";
import { filterClose } from '../../../../assets/svgs/svgs'
import { Radio } from '../inputs/radio'
import { Checkbox } from '../inputs/checkbox'
import { buildTypeAm, buildTypeEn, buildTypeRu, communityAm, communityEn, communityRu, propConditionAm, propConditionEn, propConditionRu } from './data'
import baseApi from '../../../../apis/baseApi';
import { MultiSelect } from '../inputs/multiSelect';
import { RoomSelect } from '../inputs/roomSelect';
import { bedroomsNum, roomsNum } from '../../../home/components/search/data';
import { Input } from '../inputs/input';
import './Sider.scss'

export const Sider = ({ open, setOpen, radio, setRadio }) => {
  const { t } = useTranslation()

  const lang = cookies.get("i18next")

  const [streetData, setStreetData] = useState([])
  // selected communities
  const [community, setCommunity] = useState([])
  // selected streets
  const [streets, setStreets] = useState([])
  // selected propType
  const [propType, setPropType] = useState([])
  // selected rooms
  const [rooms, setRooms] = useState(null)
  // selected square
  const [squareMin, setSquareMin] = useState(null)
  const [squareMax, setSquareMax] = useState(null)
  // selected price
  const [priceMin, setPriceMin] = useState(null)
  const [priceMax, setPriceMax] = useState(null)
  // selected buildingType
  const [buildType, setBuildType] = useState([])
  // selected newBuild
  const [newBuild, setNewBuild] = useState(false)
  // selected propCondition
  const [propCondition, setPropCondition] = useState([])
  // selected square
  const [floorMin, setFloorMin] = useState(null)
  const [floorMax, setFloorMax] = useState(null)
  // selected descriotion
  const [description, setDescription] = useState(null)
  // selected id
  const [id, setId] = useState(null)

  let data = {
    language:lang,
    type: radio,
    propertyType: propType,
    community: community,
    streets: streets,
    rooms: rooms,
    squareMin: squareMin,
    squareMax: squareMax,
    priceMin: priceMin,
    priceMax: priceMax,
    buildingType: buildType,
    propertyCondition: propCondition,
    floorMin: floorMin,
    floorMax: floorMax,
    description: description,
    id: id
  }
  console.log(data)//

  useEffect(() => {
    // fetch streets by community
    baseApi.post(`api/getCommunitySearch/${lang}`, { "ids": community })
      .then(res => {
        setStreetData(res.data);
      })
      .catch(err => console.log(err.message))
  }, [lang, community])

  const handleCommunity = (e, id) => {
    if (e.target.checked) {
      setCommunity((prev) => [...prev, id]);
    } else {
      setCommunity((prev) => prev.filter((item) => item !== id));
    }
  };

  const handlePropType = (e, id) => {
    if (e.target.checked) {
      setPropType((prev) => [...prev, id]);
    } else {
      setPropType((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleBuildType = (e, id) => {
    if (e.target.checked) {
      setBuildType((prev) => [...prev, id]);
    } else {
      setBuildType((prev) => prev.filter((item) => item !== id));
    }
  };

  const handlePropCondition = (e, id) => {
    if (e.target.checked) {
      setPropCondition((prev) => [...prev, id]);
    } else {
      setPropCondition((prev) => prev.filter((item) => item !== id));
    }
  };
  // console.log(newBuild);

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
              onChange={(e) => handlePropType(e, "house")}
              text={t("house")}
            />
            <Checkbox
              onChange={(e) => handlePropType(e, "private_house")}
              text={t("private_house")}
            />
            <Checkbox
              onChange={(e) => handlePropType(e, "commertial")}
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
                  onChange={(e) => handleCommunity(e, id)}
                  key={id}
                  text={value}
                />
              )
            })
              : lang === "en" ? communityEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handleCommunity(e, id)}
                    key={id}
                    text={value}
                  />
                )
              })
                : communityRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handleCommunity(e, id)}
                      key={id}
                      text={value}
                    />
                  )
                })}
          </div>
          <MultiSelect
            data={streetData}
            placeholder={t("street")}
            onChange={(e) => setStreets(e)}
          />
        </div>

        <div className='sider__rooms sider__block'>
          <h5>{t("rooms")}</h5>

          <RoomSelect
            data={lang === "en" ? bedroomsNum : roomsNum}
            onChange={(e) => setRooms(e)}
            rooms={rooms}
          />
        </div>

        <div className='sider__square sider__block'>
          <h5>{t("square")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("square") + t("min")}
              onChange={(e) => setSquareMin(e)}
              symbol={t("square_symbol")}
            />
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("square") + t("max")}
              onChange={(e) => setSquareMax(e)}
              symbol={t("square_symbol")}
            />
          </div>
        </div>

        <div className='sider__price sider__block'>
          <h5>{t("price")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("price") + t("min")}
              onChange={(e) => setPriceMin(e)}
              symbol="$"
            />
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("price") + t("max")}
              onChange={(e) => setPriceMax(e)}
              symbol="$"
            />
          </div>
        </div>

        <div className='sider__buildType sider__block'>
          <h5>{t("building_type")}</h5>

          <div className='sider__property-checkboxes'>
            {lang === "am" ? buildTypeAm.map(({ id, value }) => {
              return (
                <Checkbox
                  onChange={(e) => handleBuildType(e, id)}
                  key={id}
                  text={value}
                />
              )
            })
              : lang === "en" ? buildTypeEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handleBuildType(e, id)}
                    key={id}
                    text={value}
                  />
                )
              })
                : buildTypeRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handleBuildType(e, id)}
                      key={id}
                      text={value}
                    />
                  )
                })
            }
          </div>
        </div>

        <div className="sider__block">
          <Checkbox
            onChange={() => setNewBuild(!newBuild)}
            text={t("new_build")}
          />
        </div>

        <div className='sider__propCondition sider__block'>
          <h5>{t("property_condition")}</h5>

          <div className='sider__property-checkboxes'>
            {lang === "am" ? propConditionAm.map(({ id, value }) => {
              return (
                <Checkbox
                  onChange={(e) => handlePropCondition(e, id)}
                  key={id}
                  text={value}
                />
              )
            })
              : lang === "en" ? propConditionEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handlePropCondition(e, id)}
                    key={id}
                    text={value}
                  />
                )
              })
                : propConditionRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handlePropCondition(e, id)}
                      key={id}
                      text={value}
                    />
                  )
                })
            }
          </div>
        </div>

        <div className='sider__floor sider__block'>
          <h5>{t("floor")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("floor") + t("min")}
              onChange={(e) => setFloorMin(e)}
            />
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("floor") + t("max")}
              onChange={(e) => setFloorMax(e)}
            />
          </div>
        </div>

        <div className='sider__description sider__block'>
          <h5>{t("other_description")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputLarg'
              type="text"
              placeholder={t("other_description")}
              onChange={(e) => setDescription(e)}
            />
          </div>
        </div>

        <div className='sider__id sider__block'>
          <h5>{t("id")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputLarg'
              type="number"
              placeholder={t("id") + " ` 12345"}
              onChange={(e) => setId(e)}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
