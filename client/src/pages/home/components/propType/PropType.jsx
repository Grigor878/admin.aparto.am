import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { seeAll } from '../../../../assets/svgs/svgs'
import { addPropertyType } from '../../../../store/slices/homeSlice'
import { PropCard } from '../../../../components/propCard/PropCard'
import { getAllPropertiesByType } from '../../../../store/slices/viewSlice'
import './PropType.scss'

const PropType = ({ type, data }) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const { language } = useSelector((state => state.home))
    const { loading } = useSelector((state) => state.view);

    const navigate = useNavigate()

    const hanldeSeeById = () => {
        dispatch(addPropertyType(type))
        dispatch(getAllPropertiesByType({ language, type }))
            .then(() => {
                navigate('/result')
            })
    }

    return (
        <div className='propType'>
            <div className='propType__top'>
                <h2 className='title'>{t(type)}</h2>
                {!loading
                    ? <button
                        className='propType__top-seeAll'
                        onClick={hanldeSeeById}
                    >
                        {t("seeAll")}{seeAll.icon}
                    </button>
                    : <button
                        className='propType__top-seeAll'
                    >
                        {t("loading")}
                    </button>
                }
            </div>
            <PropCard data={data} />
        </div >
    )
}

export default PropType
