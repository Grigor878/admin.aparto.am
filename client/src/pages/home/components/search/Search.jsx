import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionState } from '../../../../hooks/useSessionState'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownModified } from '../inputs/dropdownModified'
import { Dropdown } from '../inputs/dropdown'
import { bedroomsNum, propertyTypeAm, propertyTypeEn, propertyTypeRu, roomsNum } from './data'
import { clearSidertData, postSearchData } from '../../../../store/slices/viewSlice'
import { addPropertyType, addTransactionType, addRooms, addPrice, getSearchData, addStreets } from '../../../../store/slices/homeSlice';
import './Search.scss'

export const Search = () => {
    const { t } = useTranslation()

    const { language } = useSelector((state => state.home))

    const dispatch = useDispatch()
    let community = []

    useEffect(() => {
        dispatch(getSearchData({ language, community }))
    }, [dispatch, language])

    const { searchData } = useSelector((state => state.home))

    const [disable, setDisable] = useState(false)
    const [active, setActive] = useSessionState("sale", "homeTransactionType")//done
    const [streets, setStreets] = useState([])////////
    const [propType, setPropType] = useState([])//done
    const [rooms, setRomms] = useState([])//done
    const [price, setPrice] = useState("")//done
    // console.log(streets)//
    const navigate = useNavigate()

    const handleSearch = () => {
        setDisable(true)

        // const searchData = [
        //     {
        //         type: active,
        //     },
        //     {
        //         community: community
        //     },
        //     {
        //         propertyType: propType
        //     },
        //     {
        //         rooms: rooms
        //     },
        //     {
        //         price: price
        //     }
        // ]

        dispatch(addTransactionType(active))
        dispatch(addStreets(streets))
        dispatch(addPropertyType(propType))
        dispatch(addRooms(rooms))
        dispatch(addPrice(price))
        // dispatch(clearSidertData())
        sessionStorage.removeItem("siderSqMin");
        sessionStorage.removeItem("siderSqMax");
        sessionStorage.removeItem("siderPriceMin");
        sessionStorage.removeItem("siderBuildType");
        sessionStorage.removeItem("siderNewBuild");
        sessionStorage.removeItem("siderPropCondition");
        sessionStorage.removeItem("siderFloorMin");
        sessionStorage.removeItem("siderFloorMax");
        sessionStorage.removeItem("siderDesc");
        sessionStorage.removeItem("siderId");
        // dispatch(postSearchData({ searchData, language }))
        // .then(() => {
        navigate("/result")
        // })
    }

    return (
        <div className='search'>
            <ul className="search__tabs">
                <li
                    className={active === "sale" ? 'search__tabs-linkActive' : 'search__tabs-link'}
                    onClick={() => setActive("sale")}>
                    {t("sale")}
                </li>
                <li
                    className={active === "rent" ? 'search__tabs-linkActive' : 'search__tabs-link'}
                    onClick={() => setActive("rent")}>
                    {t("rent")}
                </li>
            </ul>

            <div className='search__inputs'>
                <DropdownModified
                    data={searchData}
                    onChange={(e) => setStreets(e)}
                    width="262px"
                    placeholder={t("search")}
                />
                <Dropdown
                    data={language === "am" ? propertyTypeAm : language === "en" ? propertyTypeEn : propertyTypeRu}
                    onChange={(e) => setPropType(e)}
                    width="100%"
                    placeholder={t("property_type")}
                />
                <Dropdown
                    data={language === "en" ? bedroomsNum : roomsNum}
                    onChange={(e) => setRomms(e)}
                    width="100%"
                    placeholder={t("rooms")}
                />
                <input
                    placeholder={t("max_price")}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={!disable ? handleSearch : null} >{!disable ? t("search_btn") : t("loading")}</button>
            </div>
        </div>
    )
}
