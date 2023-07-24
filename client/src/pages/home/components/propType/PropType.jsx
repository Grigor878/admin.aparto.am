import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { seeAll } from '../../../../assets/svgs/svgs'
import { PropCard } from '../../../../components/propCard/PropCard'
import './PropType.scss'

const PropType = ({ type }) => {
    const { t } = useTranslation()

    const { sale, rent } = useSelector((state => state.home))
    console.log(sale)//
    console.log(rent)//

    return (
        <div className='propType'>
            <div className='propType__top'>
                <h2 className='title'>{t(type)}</h2>
                <Link className='propType__top-seeAll' to={"/for-" + type}>{t("seeAll")}{seeAll.icon}</Link>
            </div>
            <div className="propType__cards">
                <PropCard />
            </div>
        </div>
    )
}

export default PropType
