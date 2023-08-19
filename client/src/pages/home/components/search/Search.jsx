import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionState } from '../../../../hooks/useSessionState'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownModified } from '../inputs/dropdownModified'
import { Dropdown } from '../inputs/dropdown'
import { bedroomsNum, propertyTypeAm, propertyTypeEn, propertyTypeRu, roomsNum } from './data'
import { postSearchData } from '../../../../store/slices/viewSlice'
import { addPropertyType, getSearchData } from '../../../../store/slices/homeSlice';
import './Search.scss'

export const Search = () => {
    const { t } = useTranslation()

    const { language } = useSelector((state => state.home))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSearchData(language))
    }, [dispatch, language])

    const { searchData } = useSelector((state => state.home))

    const [disable, setDisable] = useState(false)
    const [active, setActive] = useSessionState("sale", "homeSearch")
    const [community, setCommunity] = useState([])
    const [type, setType] = useState([])
    const [rooms, setRomms] = useState([])
    const [price, setPrice] = useState(null)

    const navigate = useNavigate()

    const handleSearch = () => {
        setDisable(true)

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

        dispatch(addPropertyType(active))
        dispatch(postSearchData({ searchData, language }))
            .then(() => {
                navigate("/result")
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
                    data={language === "am" ? propertyTypeAm : language === "en" ? propertyTypeEn : propertyTypeRu}
                    onChange={(e) => setType(e)}
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
