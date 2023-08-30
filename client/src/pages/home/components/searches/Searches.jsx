import React from 'react'
import { useTranslation } from 'react-i18next'
import { search } from '../../../../assets/svgs/svgs'
import './Searches.scss'
import { useSelector } from 'react-redux'
import { usdFormater } from '../../../../helpers/formatters'

const Searches = () => {
    const { t } = useTranslation()

    const { language, transactionType, propertyType, room, price } = useSelector((state => state.home))

    return (
        propertyType?.length || transactionType || room?.length || price
            ? <div className='searches'>
                <h2 className='title'>{t("searches")}</h2>
                <div className="searches__row">

                    {propertyType?.length || transactionType ?
                        <div className="searches__col">
                            {search.icon}

                            <div className="searches__col-context" >
                                <p>{propertyType[0] === "house" ? t("house")
                                    : propertyType[0] === "privateHouse" ? t("private_house")
                                        : propertyType[0] === "commercial" ? t("commercial") : null}
                                    {"  "}
                                    {transactionType === "sale" ? t("sale").toLowerCase() : t("rent").toLowerCase()}
                                </p>
                                <span></span>
                            </div>
                        </div>
                        : null}

                    {room?.length
                        ? <div className="searches__col">
                            {search.icon}

                            <div className="searches__col-context" >
                                <p>{language === "en" ? t("number_of_bedrooms") : t("number_of_rooms")}</p>
                                <span>{room.map((el, index) => (
                                    <div key={index}>{el}</div>
                                ))}</span>
                            </div>
                        </div>
                        : null}

                    {price && <div className="searches__col">
                        {search.icon}

                        <div className="searches__col-context" >
                            <p>{t("price")}</p>
                            <span>{usdFormater(price)}</span>
                        </div>
                    </div>}
                </div>
            </div>
            : null
    )
}

export default Searches