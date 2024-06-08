import React from 'react'
import { useTranslation } from 'react-i18next'
import { search } from '../../../../assets/svgs/svgs'
import { useDispatch, useSelector } from 'react-redux'
import { usdFormater } from '../../../../helpers/formatters'
import cookies from "js-cookie";
import './Searches.scss'
import { useNavigate } from 'react-router-dom'
import { postSearchData } from '../../../../store/slices/viewSlice'

const Searches = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const { language } = useSelector((state => state.home))
    const { paginatePage, perPage } = useSelector((state => state.view))

    const navigate = useNavigate()

    const searchHistory = JSON.parse(cookies.get("searchHistory") || "[]");

    const handleSearch = (type, community, propertyType, rooms, price) => {
        const searchData = [
            { type },
            { community },
            { propertyType },
            { rooms },
            { price },
            { page: paginatePage },
            { perPage: perPage }
        ]

        dispatch(postSearchData({ searchData, language }))
            .then(() => {
                navigate("/result")
            })
    }

    return (
        searchHistory?.length > 0 &&
        <div className='searches block'>
            <h2 className='title'>{t("searches")}</h2>
            <div className="searches__row">
                {searchHistory?.map(({ id, type, community, propertyType, price, rooms }) => {
                    return (
                        <div
                            key={id}
                            className="searches__col"
                            onClick={() => handleSearch(type, community, propertyType, rooms, price)}
                        >
                            {search.icon}
                            <div className="searches__col-context">
                                <p>
                                    {propertyType[0] === "house" ? t("house")
                                        : propertyType[0] === "privateHouse" ? t("private_house")
                                            : propertyType[0] === "commercial" ? t("commercial") : null}
                                    {"  "}
                                    {type === "sale" ? t("sale").toLowerCase() : t("rent").toLowerCase()}
                                </p>
                                <span>
                                    {community?.map((el, index) => (
                                        index > 0 ? `,${el}` : el
                                    ))}

                                    {rooms?.length > 0 && <>
                                        {" | "}
                                        {language === "en" ? t("number_of_bedrooms") : t("number_of_rooms")}
                                        {" "}
                                        {rooms?.map((el, index) => (
                                            index > 0 ? `,${el}` : el
                                        ))}
                                    </>}

                                    {price && ` | ${usdFormater(price)}`}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Searches

// .join('')

// {/* {propertyType?.length || transactionType ?
//                     <div className="searches__col">
//                         {search.icon}

//                         <div className="searches__col-context" >
//                             <p>{propertyType[0] === "house" ? t("house")
//                                 : propertyType[0] === "privateHouse" ? t("private_house")
//                                     : propertyType[0] === "commercial" ? t("commercial") : null}
//                                 {"  "}
//                                 {transactionType === "sale" ? t("sale").toLowerCase() : t("rent").toLowerCase()}
//                             </p>
//                             <span></span>
//                         </div>
//                     </div>
//                     : null} */}

// {/* {room?.length
//                     ? <div className="searches__col">
//                         {search.icon}

//                         <div className="searches__col-context" >
//                             <p>{language === "en" ? t("number_of_bedrooms") : t("number_of_rooms")}</p>
//                             <span>{room.map((el, index) => (
//                                 <div key={index}>{el}</div>
//                             ))}</span>
//                         </div>
//                     </div>
//                     : null}

//                 {price && <div className="searches__col">
//                     {search.icon}

//                     <div className="searches__col-context" >
//                         <p>{t("price")}</p>
//                         <span>{usdFormater(price)}</span>
//                     </div>
//                 </div>} */}