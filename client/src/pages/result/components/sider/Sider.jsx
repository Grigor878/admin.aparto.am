import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { filterClose } from "../../../../assets/svgs/svgs";
import { Radio } from "../inputs/radio";
import { Checkbox } from "../inputs/checkbox";
import {
  buildTypeAm,
  buildTypeEn,
  buildTypeRu,
  communityAm,
  communityEn,
  communityRu,
  propConditionAm,
  propConditionEn,
  propConditionRu,
  urlCommunity,
  // urlStreets,
} from "./data";
import { MultiSelect } from "../inputs/multiSelect";
import { RoomSelect } from "../inputs/roomSelect";
import { Input } from "../inputs/input";
import {
  clearHomeSearchInfo,
  clearResultData,
  getResultPageData,
  setKeywords,
  setPage,
  setPaginatePage,
} from "../../../../store/slices/viewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import debounce from "lodash/debounce";
import useQueryParams from "../../../../hooks/useQueryParams";
import {
  formatResultUrl,
  getDataFromUrl,
  parseUrlSegments,
} from "../../../../helpers/formatters";
import "./Sider.scss";

export const Sider = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transactionType, propertyType, room, price, language } = useSelector(
    (state) => state.home
  );
  const {
    page,
    paginatePage,
    perPage,
    searchedCommunities,
    searchedAddresses,
    keywords,
  } = useSelector((state) => state.view);

  // search parametrs
  const params = useParams();
  const location = useLocation();

  const { type, property, newbuild, commune, street } =
    parseUrlSegments(params);

  const [
    pageParam,
    roomsParam,
    minSquareParam,
    maxSquareParam,
    minPriceParam,
    maxPriceParam,
    minFloorParam,
    maxFloorParam,
    buildingTypeParam,
    conditionParam,
    descriptionParam,
    idParam,
    setParams,
    removeParam,
  ] = useQueryParams([
    "page",
    "rooms",
    "min_square",
    "max_square",
    "min_price",
    "max_price",
    "floor_min",
    "floor_max",
    "building_type",
    "condition",
    "description",
    "id",
  ]);

  const [radio, setRadio] = useState(type || transactionType);
  const [propType, setPropType] = useState(property || propertyType[0]);
  const [newBuild, setNewBuild] = useState(
    newbuild === "new-building" ? true : "on"
  );
  const [community, setCommunity] = useState(
    searchedCommunities?.length && !commune
      ? searchedCommunities
      : getDataFromUrl(commune, urlCommunity)
  );
  const [streets, setStreets] = useState(
    searchedAddresses || []
    // searchedAddresses?.length ? searchedAddresses : []
    // searchedAddresses?.length && !street
    //   ? searchedAddresses
    //   : getDataFromUrl(street, urlStreets)
  );

  const [rooms, setRooms] = useState(roomsParam?.split(",") || room);
  const [squareMin, setSquareMin] = useState(minSquareParam || "");
  const [squareMax, setSquareMax] = useState(maxSquareParam || "");
  const [priceMin, setPriceMin] = useState(minPriceParam || "");
  const [priceMax, setPriceMax] = useState(maxPriceParam || price);
  const [buildType, setBuildType] = useState(buildingTypeParam || []);
  const [propCondition, setPropCondition] = useState(conditionParam || []);
  const [floorMin, setFloorMin] = useState(minFloorParam || "");
  const [floorMax, setFloorMax] = useState(maxFloorParam || "");
  const [description, setDescription] = useState(descriptionParam || keywords);
  const [id, setId] = useState(idParam || "");

  const mobile = useMediaQuery({ maxWidth: 768 });

  // community
  const handleUpdate = (e, setState, id) => {
    dispatch(setPage("result"));
    dispatch(setPaginatePage("1"));

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1200);

    if (e.target.checked) {
      setState((prev) => [...prev, id]);
    } else {
      setState((prev) => prev.filter((item) => item !== id));
    }
  };

  // buildType, propCondition
  const handleUpdateQuery = (e, setState, key, id) => {
    dispatch(setPage("result"));
    dispatch(setPaginatePage("1"));

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1200);

    const urlParams = new URLSearchParams(window.location.search);

    if (e.target.checked) {
      setState((prev) => [...prev, id]);
      const existingValues = urlParams.get(key)?.split(",") || [];
      if (!existingValues.includes(id)) {
        existingValues.push(id);
        urlParams.set(key, existingValues.join(","));
      }
    } else {
      setState((prev) => prev.filter((item) => item !== id));
      const existingValues = urlParams.get(key)?.split(",") || [];
      const updatedValues = existingValues.filter((item) => item !== id);
      if (updatedValues.length > 0) {
        urlParams.set(key, updatedValues.join(","));
      } else {
        urlParams.delete(key);
      }
    }

    let url = `?${urlParams.toString()}`;
    url = url.replace(/%2C/g, ",");

    if ([...urlParams].length > 0) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  // transactionType, propertyType, newBuild, street
  const handleSetState = (setState, value) => {
    dispatch(setPage("result"));
    dispatch(setPaginatePage("1"));
    setState(value);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1200);
  };

  // rooms, square, price, floor, other_description, id
  const handleSetStateQuery = (setState, key, value) => {
    if (!value || value?.length === 0) {
      removeParam(key);
    } else {
      setParams({ [key]: value });
    }
    dispatch(setPage("result"));
    dispatch(setPaginatePage("1"));
    setState(value);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1200);
  };

  // rooms
  // const handleRoomsQuery = (setState, key, value) => {
  //   dispatch(setPage("result"));
  //   dispatch(setPaginatePage("1"));

  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 1200);

  //   const urlParams = new URLSearchParams(window.location.search);

  //   if (!value || value.length === 0) {
  //     urlParams.delete(key);
  //   } else {
  //     urlParams.set(key, value?.join(","));
  //   }

  //   let url = `?${urlParams.toString()}`;
  //   url = decodeURIComponent(url);
  //   url = url?.replace(/%2C/g, ",");

  //   if ([...urlParams].length > 0) {
  //     window.history.replaceState({}, "", url);
  //   } else {
  //     window.history.replaceState({}, "", window.location.pathname);
  //   }

  //   setState(value);
  // };

  const clearSearch = () => {
    const paramsToClear = [
      "page",
      "rooms",
      "min_square",
      "max_square",
      "min_price",
      "max_price",
      "floor_min",
      "floor_max",
      "building_type",
      "condition",
      "description",
      "id",
    ];

    paramsToClear.forEach((param) => removeParam(param));

    setParams({ page: null });

    dispatch(setPage("result"));
    dispatch(setPaginatePage(1));
    dispatch(clearHomeSearchInfo());

    setCommunity([]);
    setStreets([]);
    setPropType([]);
    setRooms([]);
    setSquareMin("");
    setSquareMax("");
    setPriceMin("");
    setPriceMax("");
    setBuildType([]);
    setNewBuild("on");
    setPropCondition([]);
    setFloorMin("");
    setFloorMax("");
    setDescription("");
    dispatch(setKeywords(""));
    setId("");

    if (mobile) {
      setOpen(false);
    }
  };

  const buildUrl = () => {
    let urlParts = [`/${language}/result`];

    radio && urlParts.push(radio);
    propType && urlParts.push(propType);
    newBuild === true && urlParts.push("new-building");
    community &&
      urlParts.push(
        urlCommunity
          ?.filter((item) => community?.includes(item.id) && item.id !== 15)
          ?.map((item) => item.value.toLowerCase())
      );
    // streets &&
    //   urlParts.push(
    //     urlStreets
    //       ?.filter((item) => street?.includes(item.id))
    //       ?.map((item) => item.value.toLowerCase().replace(/ /g, '-'))
    //     // ?.map((item) => encodeURIComponent(item.name.toLowerCase().replace(/ /g, '-')))
    //     // .join(",")
    //   );

    pageParam && urlParts.push(`?page=${pageParam}`);

    return urlParts?.join("/")?.replace(/\/+/g, "/")?.replace(/\/$/, "");
  };

  // useEffect(() => {
  //   const buildTypeFromUrl = buildingTypeParam?.split(",") || [];
  //   setBuildType(buildTypeFromUrl);

  //   const propConditionFromUrl = conditionParam?.split(",") || [];
  //   setPropCondition(propConditionFromUrl);
  // }, [buildingTypeParam, conditionParam]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const query = urlParams.toString();
    const url = buildUrl();

    navigate({
      pathname: url,
      search: query.toString(),
      // search: query ? formatResultUrl(query) : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radio, propType, newBuild, community]);

  useEffect(() => {
    const debouncedSearch = debounce((searchData) => {
      dispatch(clearResultData());
      dispatch(getResultPageData({ language, searchData }));
      setOpen(mobile ? false : true);
    }, 1000);

    const searchData = {
      type: radio,
      propertyType: propType?.length ? [propType] : [],
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
      page: Number(pageParam) || paginatePage,
      perPage: perPage,
    };

    if (page === "home") {
      return;
    }

    debouncedSearch(searchData);

    return () => {
      debouncedSearch.cancel();
    };
  }, [
    dispatch,
    buildType,
    community,
    description,
    floorMax,
    floorMin,
    id,
    language,
    newBuild,
    priceMax,
    priceMin,
    propCondition,
    propType,
    radio,
    rooms,
    squareMax,
    squareMin,
    streets,
    page,
    paginatePage,
    perPage,
    setOpen,
    mobile,
    pageParam,
  ]);

  return (
    open && (
      <div className="sider">
        <div className="sider__main">
          <div className="sider__title">
            <h6>{t("filters")}</h6>

            <div className="sider__title-btns">
              <button onClick={() => clearSearch()}>{t("clear")}</button>

              <button onClick={() => setOpen(false)}>{filterClose.icon}</button>
            </div>
          </div>

          <div className="sider__transaction sider__block">
            <h5>{t("transactionType")}</h5>

            <div className="sider__transaction-radios">
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

          <div className="sider__property sider__block">
            <h5>{t("propertyType")}</h5>

            <div className="sider__property-checkboxes">
              <Radio
                id="type_radio"
                onChange={() => handleSetState(setPropType, "house")}
                text={t("house")}
                checked={propType === "house"}
              />
              <Radio
                id="type_radio"
                onChange={() => handleSetState(setPropType, "privateHouse")}
                text={t("private_house")}
                checked={propType === "privateHouse"}
              />
              <Radio
                id="type_radio"
                onChange={() => handleSetState(setPropType, "commercial")}
                text={t("commercial")}
                checked={propType === "commercial"}
              />
            </div>
          </div>

          <div className="sider__block">
            <Checkbox
              onChange={(e) =>
                handleSetState(setNewBuild, e.target.checked ? true : "on")
              }
              text={t("new_build")}
              checked={newBuild === true}
            />
          </div>

          <div className="sider__community sider__block">
            <h5>{t("community")}</h5>

            <div className="sider__community-checkboxes">
              {language === "am"
                ? communityAm.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) => handleUpdate(e, setCommunity, id)}
                        key={id}
                        text={value}
                        checked={community?.includes(id)}
                      />
                    );
                  })
                : language === "en"
                ? communityEn.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) => handleUpdate(e, setCommunity, id)}
                        key={id}
                        text={value}
                        checked={community?.includes(id)}
                      />
                    );
                  })
                : communityRu.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) => handleUpdate(e, setCommunity, id)}
                        key={id}
                        text={value}
                        checked={community?.includes(id)}
                      />
                    );
                  })}
            </div>
            <MultiSelect
              community={community}
              placeholder={t("street")}
              onChange={(e) => handleSetState(setStreets, e)}
              selected={streets} //
            />
          </div>

          <div className="sider__rooms sider__block">
            <h5>{t("rooms")}</h5>

            <RoomSelect
              language={language}
              // data={language === "en" ? bedroomsNum : roomsNum}
              onChange={
                (selectedRooms) =>
                  handleSetStateQuery(setRooms, "rooms", selectedRooms)
                // setParams({room: selectedRooms});
              }
              selectedRooms={rooms}
            />
          </div>

          <div className="sider__square sider__block">
            <h5>{t("square")}</h5>

            <div className="sider__square-inputs">
              <Input
                className="inputSmall"
                type="number"
                placeholder={t("square") + t("min")}
                onChange={(e) =>
                  handleSetStateQuery(setSquareMin, "min_square", e)
                }
                symbol={t("square_symbol")}
                value={squareMin}
              />
              <Input
                className="inputSmall"
                type="number"
                placeholder={t("square") + t("max")}
                onChange={(e) =>
                  handleSetStateQuery(setSquareMax, "max_square", e)
                }
                symbol={t("square_symbol")}
                value={squareMax}
              />
            </div>
          </div>

          <div className="sider__price sider__block">
            <h5>{t("price")}</h5>

            <div className="sider__square-inputs">
              <Input
                className="inputSmall"
                type="number"
                placeholder={t("price") + t("min")}
                onChange={(e) =>
                  handleSetStateQuery(setPriceMin, "min_price", e)
                }
                symbol="$"
                value={priceMin}
              />
              <Input
                className="inputSmall"
                type="number"
                placeholder={t("price") + t("max")}
                onChange={(e) =>
                  handleSetStateQuery(setPriceMax, "max_price", e)
                }
                symbol="$"
                value={priceMax}
              />
            </div>
          </div>

          <div className="sider__buildType sider__block">
            <h5>{t("building_type")}</h5>

            <div className="sider__property-checkboxes">
              {language === "am"
                ? buildTypeAm.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) =>
                          handleUpdateQuery(
                            e,
                            setBuildType,
                            "building_type",
                            id
                          )
                        }
                        key={id}
                        text={value}
                        checked={buildType?.includes(id)}
                      />
                    );
                  })
                : language === "en"
                ? buildTypeEn.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) =>
                          handleUpdateQuery(
                            e,
                            setBuildType,
                            "building_type",
                            id
                          )
                        }
                        key={id}
                        text={value}
                        checked={buildType?.includes(id)}
                      />
                    );
                  })
                : buildTypeRu.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) =>
                          handleUpdateQuery(
                            e,
                            setBuildType,
                            "building_type",
                            id
                          )
                        }
                        key={id}
                        text={value}
                        checked={buildType?.includes(id)}
                      />
                    );
                  })}
            </div>
          </div>

          <div className="sider__propCondition sider__block">
            <h5>{t("property_condition")}</h5>

            <div className="sider__property-checkboxes">
              {language === "am"
                ? propConditionAm.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) =>
                          handleUpdateQuery(
                            e,
                            setPropCondition,
                            "condition",
                            id
                          )
                        }
                        key={id}
                        text={value}
                        checked={propCondition?.includes(id)}
                      />
                    );
                  })
                : language === "en"
                ? propConditionEn.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) =>
                          handleUpdateQuery(
                            e,
                            setPropCondition,
                            "condition",
                            id
                          )
                        }
                        key={id}
                        text={value}
                        checked={propCondition?.includes(id)}
                      />
                    );
                  })
                : propConditionRu.map(({ id, value }) => {
                    return (
                      <Checkbox
                        onChange={(e) =>
                          handleUpdateQuery(
                            e,
                            setPropCondition,
                            "condition",
                            id
                          )
                        }
                        key={id}
                        text={value}
                        checked={propCondition?.includes(id)}
                      />
                    );
                  })}
            </div>
          </div>

          <div className="sider__floor sider__block">
            <h5>{t("floor")}</h5>

            <div className="sider__square-inputs">
              <Input
                className="inputSmall"
                type="number"
                placeholder={t("floor") + t("min")}
                onChange={(e) =>
                  handleSetStateQuery(setFloorMin, "floor_min", e)
                }
                value={floorMin}
              />
              <Input
                className="inputSmall"
                type="number"
                placeholder={t("floor") + t("max")}
                onChange={(e) =>
                  handleSetStateQuery(setFloorMax, "floor_max", e)
                }
                value={floorMax}
              />
            </div>
          </div>

          <div className="sider__description sider__block">
            <h5>{t("other_description")}</h5>

            <div className="sider__square-inputs">
              <Input
                className="inputLarg"
                type="text"
                placeholder={t("other_description")}
                onChange={(e) => {
                  handleSetStateQuery(setDescription, "description", e);
                  dispatch(setKeywords(e));
                }}
                value={description}
              />
            </div>
          </div>

          <div className="sider__id sider__block">
            <h5>{t("id")}</h5>

            <div className="sider__square-inputs">
              <Input
                className="inputLarg"
                type="number"
                placeholder={
                  language === "am"
                    ? t("id") + " ` 12345"
                    : t("id") + " : 12345"
                }
                onChange={(e) => handleSetStateQuery(setId, "id", e)}
                value={id}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

// if (e.target.checked) {
//   setState((prev) => [...prev, id]);

//   const existingValues = urlParams.get(key)?.split(",") || [];
//   if (!existingValues.includes(id)) {
//     urlParams.set(key, [...existingValues, id].join(","));
//   }
// } else {
//   setState((prev) => prev.filter((item) => item !== id));

//   const existingValues = urlParams.get(key)?.split(",") || [];
//   const updatedValues = existingValues.filter((item) => item !== id);
//   if (updatedValues.length > 0) {
//     urlParams.set(key, updatedValues.join(","));
//   } else {
//     urlParams.delete(key);
//   }
// }

// if ([...urlParams].length > 0) {
//   window.history.replaceState({}, "", `?${urlParams.toString()}`);
// } else {
//   window.history.replaceState({}, "", window.location.pathname);
// }

// if (radio) {
//   urlParts.push(radio);
// }
// if (propType) {
//   urlParts.push(propType);
// }
// if (newBuild === true) {
//   urlParts.push("new-building");
// }
// if (community) {
//   const matchedValues = urlCommunity
//     ?.filter((item) => community?.includes(item.id) && item.id !== 15)
//     ?.map((item) => item.value.toLowerCase());
//   urlParts.push(matchedValues);
// }
// if (pageParam) {
//   urlParts.push(`?page=${pageParam}`);
// }

// searchedCommunities?.length

// useEffect(() => {
//   dispatch(setSearchedCommunities(getCommunityFromUrl(commune, communityEn)));
// }, [commune, community, dispatch]);
