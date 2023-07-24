import React from 'react'
import { useTranslation } from 'react-i18next'
import { search } from '../../../../assets/svgs/svgs'
import './Searches.scss'

const Searches = () => {
    const { t } = useTranslation()

    return (
        <div className='searches'>
            <h2 className='title'>{t("searches")}</h2>
            <div className="searches__row">
                <div className="searches__col">
                    {search.icon}

                    <div className="searches__col-context" >
                        <p>Բնակարան վարձակալություն</p>
                        <span></span>
                    </div>
                </div>
                <div className="searches__col">
                    {search.icon}

                    <div className="searches__col-context" >
                        <p>Apartment Rent</p>
                        <span>Baghramyan street</span>
                    </div>
                </div>
                <div className="searches__col">
                    {search.icon}

                    <div className="searches__col-context" >
                        <p>Apartment Sale</p>
                        <span>Baghramyan street |3 bedrooms | $100.000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searches