import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { filterClose } from '../../../../assets/svgs/svgs'
import { Radio } from '../inputs/radio'
import { Checkbox } from '../inputs/checkbox'
import { buildTypeAm, buildTypeEn, buildTypeRu, communityAm, communityEn, communityRu, propConditionAm, propConditionEn, propConditionRu } from './data'
import { MultiSelect } from '../inputs/multiSelect';
import { RoomSelect } from '../inputs/roomSelect';
import { Input } from '../inputs/input';
import { clearHomeSearchInfo, clearResultData, getResultPageData, setKeywords, setPage, setPaginatePage } from '../../../../store/slices/viewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSessionState } from '../../../../hooks/useSessionState'
import { useMediaQuery } from 'react-responsive'
import debounce from 'lodash/debounce';
import './Sider.scss'

export const Sider = ({ open, setOpen }) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()

  const { transactionType, propertyType, room, price, language } = useSelector((state) => state.home);
  const { page, paginatePage, perPage, searchedCommunities, searchedAddresses, keywords } = useSelector((state) => state.view);

  const mobile = useMediaQuery({ maxWidth: 768 })

  const [radio, setRadio] = useState(transactionType)//done
  const [community, setCommunity] = useState(searchedCommunities?.length ? searchedCommunities : [])////////
  const [streets, setStreets] = useState(searchedAddresses?.length ? searchedAddresses : [])////////
  const [propType, setPropType] = useState(propertyType)//done
  const [rooms, setRooms] = useState(room)//done
  const [squareMin, setSquareMin] = useSessionState("", "siderSqMin")
  const [squareMax, setSquareMax] = useSessionState("", "siderSqMax")
  const [priceMin, setPriceMin] = useSessionState("", "siderPriceMin")
  const [priceMax, setPriceMax] = useState(price)//done
  const [buildType, setBuildType] = useSessionState([], "siderBuildType")
  const [newBuild, setNewBuild] = useSessionState("on", "siderNewBuild")
  const [propCondition, setPropCondition] = useSessionState([], "siderPropCondition")
  const [floorMin, setFloorMin] = useSessionState("", "siderFloorMin")
  const [floorMax, setFloorMax] = useSessionState("", "siderFloorMax")
  // const [description, setDescription] = useSessionState("", "siderDesc")
  const [description, setDescription] = useState(keywords)
  const [id, setId] = useSessionState("", "siderId")

  // community, propType, buildType, propCondition
  const handleUpdate = (e, setState, id) => {
    dispatch(setPage("result"))
    dispatch(setPaginatePage("1"))
    navigate(location.pathname)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1200)
    if (e.target.checked) {
      setState((prev) => [...prev, id])
    } else {
      setState((prev) => prev.filter((item) => item !== id))
    }
  }

  // radio, streets, rooms, squareMin, squareMax, floorMin, floorMax, priceMin, priceMax, description, id
  const handleSetState = (setState, value) => {
    dispatch(setPage("result"))
    dispatch(setPaginatePage("1"))
    navigate(location.pathname)
    setState(value)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1200)
  };

  useEffect(() => {
    const debouncedSearch = debounce((searchData) => {
      dispatch(clearResultData());
      dispatch(getResultPageData({ language, searchData }));
      setOpen(mobile ? false : true)
    }, 1000);

    const searchData = {
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
      newBuild: newBuild,
      propertyCondition: propCondition,
      floorMin: floorMin,
      floorMax: floorMax,
      description: description,
      id: id,
      page: paginatePage,
      perPage: perPage
    }

    if (page === "home") {
      return
    }

    debouncedSearch(searchData);

    return () => {
      debouncedSearch.cancel();
    };

  }, [dispatch, buildType, community, description, floorMax, floorMin, id, language, newBuild, priceMax, priceMin, propCondition, propType, radio, rooms, squareMax, squareMin, streets, page, paginatePage, perPage, setOpen, mobile])

  const clearSearch = () => {
    sessionStorage.removeItem("siderSqMin");
    sessionStorage.removeItem("siderSqMax");
    sessionStorage.removeItem("siderPriceMax");
    sessionStorage.removeItem("siderPriceMin");
    sessionStorage.removeItem("siderBuildType");
    sessionStorage.removeItem("siderNewBuild");
    sessionStorage.removeItem("siderPropCondition");
    sessionStorage.removeItem("siderFloorMin");
    sessionStorage.removeItem("siderFloorMax");
    // sessionStorage.removeItem("siderDesc");
    sessionStorage.removeItem("siderId");

    dispatch(setPage("result"))
    dispatch(clearHomeSearchInfo())

    setCommunity([])
    setStreets([])
    setPropType([])
    setRooms([])
    setSquareMin("")
    setSquareMax("")
    setPriceMin("")
    setPriceMax("")
    setBuildType([])
    setNewBuild("on")
    setPropCondition([])
    setFloorMin("")
    setFloorMax("")
    setDescription("")
    dispatch(setKeywords(""))
    setId("")
    if (mobile) {
      setOpen(false)
    }
  }

  return (
    open &&
    <div className='sider'>
      <div className='sider__main'>
        <div className='sider__title'>
          <h6>{t("filters")}</h6>

          <div className='sider__title-btns'>
            <button onClick={() => clearSearch()}>
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
              onChange={() => handleSetState(setRadio, "sale")}
            />
            <Radio
              id="result_radio"
              text={t("rent")}
              checked={radio === "rent"}
              onChange={() => handleSetState(setRadio, "rent")}
            />
          </div>
        </div>

        <div className='sider__property sider__block'>
          <h5>{t("propertyType")}</h5>

          <div className='sider__property-checkboxes'>
            <Checkbox
              onChange={(e) => handleUpdate(e, setPropType, "house")}
              text={t("house")}
              checked={propType?.includes("house")}
            />
            <Checkbox
              onChange={(e) => handleUpdate(e, setPropType, "privateHouse")}
              text={t("private_house")}
              checked={propType?.includes("privateHouse")}
            />
            <Checkbox
              onChange={(e) => handleUpdate(e, setPropType, "commercial")}
              text={t("commercial")}
              checked={propType?.includes("commercial")}
            />
          </div>
        </div>

        <div className='sider__community sider__block'>
          <h5>{t("community")}</h5>

          <div className='sider__community-checkboxes'>
            {language === "am" ? communityAm.map(({ id, value }) => {
              return (
                <Checkbox
                  onChange={(e) => handleUpdate(e, setCommunity, id)}
                  key={id}
                  text={value}
                  checked={community?.includes(id)}
                />
              )
            })
              : language === "en" ? communityEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handleUpdate(e, setCommunity, id)}
                    key={id}
                    text={value}
                    checked={community?.includes(id)}
                  />
                )
              })
                : communityRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handleUpdate(e, setCommunity, id)}
                      key={id}
                      text={value}
                      checked={community?.includes(id)}
                    />
                  )
                })}
          </div>
          <MultiSelect
            community={community}
            placeholder={t("street")}
            onChange={(e) => handleSetState(setStreets, e)}
            selected={streets}//
          />
        </div>

        <div className='sider__rooms sider__block'>
          <h5>{t("rooms")}</h5>

          <RoomSelect
            language={language}
            // data={language === "en" ? bedroomsNum : roomsNum}
            onChange={(selectedRooms) => handleSetState(setRooms, selectedRooms)}
            selectedRooms={rooms}
          />
        </div>

        <div className='sider__square sider__block'>
          <h5>{t("square")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("square") + t("min")}
              onChange={(e) => handleSetState(setSquareMin, e)}
              symbol={t("square_symbol")}
              value={squareMin}
            />
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("square") + t("max")}
              onChange={(e) => handleSetState(setSquareMax, e)}
              symbol={t("square_symbol")}
              value={squareMax}
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
              onChange={(e) => handleSetState(setPriceMin, e)}

              symbol="$"
              value={priceMin}
            />
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("price") + t("max")}
              onChange={(e) => handleSetState(setPriceMax, e)}
              symbol="$"
              value={priceMax}
            />
          </div>
        </div>

        <div className='sider__buildType sider__block'>
          <h5>{t("building_type")}</h5>

          <div className='sider__property-checkboxes'>
            {language === "am" ? buildTypeAm.map(({ id, value }) => {
              return (
                <Checkbox
                  onChange={(e) => handleUpdate(e, setBuildType, id)}
                  key={id}
                  text={value}
                  checked={buildType?.includes(id)}
                />
              )
            })
              : language === "en" ? buildTypeEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handleUpdate(e, setBuildType, id)}
                    key={id}
                    text={value}
                    checked={buildType?.includes(id)}
                  />
                )
              })
                : buildTypeRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handleUpdate(e, setBuildType, id)}
                      key={id}
                      text={value}
                      checked={buildType?.includes(id)}
                    />
                  )
                })
            }
          </div>
        </div>

        <div className="sider__block">
          <Checkbox
            onChange={(e) => {
              dispatch(setPage("result"))
              dispatch(setPaginatePage("1"))
              navigate(location.pathname)
              setNewBuild(e.target.checked ? true : 'on')
              setTimeout(() => {
                window.scrollTo(0, 0)
              }, 1200)
            }}
            text={t("new_build")}
            checked={newBuild === true}
          />
        </div>

        <div className='sider__propCondition sider__block'>
          <h5>{t("property_condition")}</h5>

          <div className='sider__property-checkboxes'>
            {language === "am" ? propConditionAm.map(({ id, value }) => {
              return (
                <Checkbox
                  onChange={(e) => handleUpdate(e, setPropCondition, id)}
                  key={id}
                  text={value}
                  checked={propCondition?.includes(id)}
                />
              )
            })
              : language === "en" ? propConditionEn.map(({ id, value }) => {
                return (
                  <Checkbox
                    onChange={(e) => handleUpdate(e, setPropCondition, id)}
                    key={id}
                    text={value}
                    checked={propCondition?.includes(id)}
                  />
                )
              })
                : propConditionRu.map(({ id, value }) => {
                  return (
                    <Checkbox
                      onChange={(e) => handleUpdate(e, setPropCondition, id)}
                      key={id}
                      text={value}
                      checked={propCondition?.includes(id)}
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
              onChange={(e) => handleSetState(setFloorMin, e)}
              value={floorMin}
            />
            <Input
              className='inputSmall'
              type="number"
              placeholder={t("floor") + t("max")}
              onChange={(e) => handleSetState(setFloorMax, e)}
              value={floorMax}
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
              onChange={(e) => { handleSetState(setDescription, e); dispatch(setKeywords(e)) }}
              value={description}
            />
          </div>
        </div>

        <div className='sider__id sider__block'>
          <h5>{t("id")}</h5>

          <div className='sider__square-inputs'>
            <Input
              className='inputLarg'
              type="number"
              placeholder={language === "am" ? t("id") + " ` 12345" : t("id") + " : 12345"}
              onChange={(e) => handleSetState(setId, e)}
              value={id}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

// const handleCommunity = (e, id) => {
//   if (e.target.checked) {
//     setCommunity((prev) => [...prev, id]);
//   } else {
//     setCommunity((prev) => prev.filter((item) => item !== id));
//   }
// };

// const handlePropType = (e, id) => {
//   if (e.target.checked) {
//     setPropType((prev) => [...prev, id]);
//   } else {
//     setPropType((prev) => prev.filter((item) => item !== id));
//   }
// };

// const handleBuildType = (e, id) => {
//   if (e.target.checked) {
//     setBuildType((prev) => [...prev, id]);
//   } else {
//     setBuildType((prev) => prev.filter((item) => item !== id));
//   }
// };

// const handlePropCondition = (e, id) => {
//   if (e.target.checked) {
//     setPropCondition((prev) => [...prev, id]);
//   } else {
//     setPropCondition((prev) => prev.filter((item) => item !== id));
//   }
// };