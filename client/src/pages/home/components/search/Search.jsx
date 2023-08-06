import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cookies from "js-cookie";
import { useSessionState } from '../../../../hooks/useSessionState'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownModified } from '../inputs/dropdownModified'
import { Dropdown } from '../inputs/dropdown'
import { bedroomsNum, propertyTypeAm, propertyTypeEn, propertyTypeRu, roomsNum } from './data'
import { getSearchData, postSearchData } from '../../../../store/slices/homeSlice';
import './Search.scss'

export const Search = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const lang = cookies.get("i18next")

    useEffect(() => {
        dispatch(getSearchData(lang))
    }, [dispatch, lang])

    const { searchData, searchResult } = useSelector((state => state.home))
    // console.log(searchResult)//

    const [active, setActive] = useSessionState("sale", "homeSearch")
    const [community, setCommunity] = useState([])
    const [type, setType] = useState([])
    const [rooms, setRomms] = useState([])
    const [price, setPrice] = useState(null)

    const navigate = useNavigate()

    const handleSearch = () => {
        const searchData = [
            {
                type: active,
            },
            {
                community: community
            },
            {
                propertyType: type
            },
            {
                rooms: rooms
            },
            {
                price: price
            }
        ]

        dispatch(postSearchData({ searchData, lang })).then(() => {
            if (searchResult) {
                navigate("/result")
            }
        })

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
                    onChange={(e) => setCommunity(e)}
                    width="262px"
                    placeholder={t("search")}
                />
                <Dropdown
                    data={lang === "am" ? propertyTypeAm : lang === "en" ? propertyTypeEn : propertyTypeRu}
                    onChange={(e) => setType(e)}
                    width="100%"
                    placeholder={t("property_type")}
                />
                <Dropdown
                    data={lang === "en" ? bedroomsNum : roomsNum}
                    onChange={(e) => setRomms(e)}
                    width="100%"
                    placeholder={t("rooms")}
                />
                <input
                    placeholder={t("max_price")}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={handleSearch}>{t("search_btn")}</button>
            </div>
        </div>
    )
}
