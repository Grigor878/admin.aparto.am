import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { seeAll } from '../../../../assets/svgs/svgs'
import { useDispatch } from 'react-redux'
import { addPropertyType, clearSearchResult } from '../../../../store/slices/homeSlice'
import { PropCard } from '../../../../components/propCard/PropCard'
import './PropType.scss'

const PropType = ({ type, data }) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const hanldeSeeById = () => {
        dispatch(clearSearchResult())
        dispatch(addPropertyType(type))
        navigate('/result')
    }

    return (
        <div className='propType'>
            <div className='propType__top'>
                <h2 className='title'>{t(type)}</h2>
                <button
                    className='propType__top-seeAll'
                    onClick={hanldeSeeById}
                >
                    {t("seeAll")}{seeAll.icon}
                </button>
            </div>
            <PropCard data={data} />
        </div>
    )
}

export default PropType
