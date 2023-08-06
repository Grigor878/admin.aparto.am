import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { seeAll } from '../../../../assets/svgs/svgs'
import { useDispatch } from 'react-redux'
import { clearSearchResult, getAllPropertiesByType } from '../../../../store/slices/homeSlice'
import { PropCard } from '../../../../components/propCard/PropCard'
import './PropType.scss'

const PropType = ({ type, data }) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const hanldeSeeById = () => {
        const props = {
            "type": type
        }

        dispatch(clearSearchResult())
        dispatch(getAllPropertiesByType({ props }))
        navigate('/result')
    }

    return (
        <div className='propType'>
            <div className='propType__top'>
                <h2 className='title'>{t(type)}</h2>
                <button
                    className='propType__top-seeAll'
                    onClick={hanldeSeeById}
                // to="/result"
                >
                    {t("seeAll")}{seeAll.icon}
                </button>
            </div>
            <PropCard data={data} />
        </div>
    )
}

export default PropType
