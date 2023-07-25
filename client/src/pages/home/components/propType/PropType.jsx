import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { seeAll } from '../../../../assets/svgs/svgs'
import { PropCard } from '../../../../components/propCard/PropCard'
import './PropType.scss'

const PropType = ({ type, data }) => {
    const { t } = useTranslation()

    return (
        <div className='propType'>
            <div className='propType__top'>
                <h2 className='title'>{t(type)}</h2>
                <Link className='propType__top-seeAll' to={"/for-" + type}>{t("seeAll")}{seeAll.icon}</Link>
            </div>
            <PropCard type={type} data={data} />
        </div>
    )
}

export default PropType
