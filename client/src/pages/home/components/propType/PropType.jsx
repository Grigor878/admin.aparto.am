import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { seeAll } from '../../../../assets/svgs/svgs'
import { addTransactionType, clearPrice, clearPropertyType, clearRooms } from '../../../../store/slices/homeSlice'
import { PropCard } from '../../../../components/propCard/PropCard'
import { clearHomeSearchInfo, clearSidertData, setPage } from '../../../../store/slices/viewSlice'
import './PropType.scss'
import Skeleton from '../../../../components/skeleton/Skeleton'

const PropType = ({ type, data }) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const hanldeSeeById = () => {
        dispatch(addTransactionType(type))
        dispatch(clearPropertyType())
        dispatch(clearRooms())
        dispatch(clearPrice())
        dispatch(clearSidertData())
        dispatch(clearHomeSearchInfo())
        dispatch(setPage("result"))//
        sessionStorage.removeItem("siderSqMin");
        sessionStorage.removeItem("siderSqMax");
        sessionStorage.removeItem("siderPriceMin");
        sessionStorage.removeItem("siderBuildType");
        sessionStorage.removeItem("siderNewBuild");
        sessionStorage.removeItem("siderPropCondition");
        sessionStorage.removeItem("siderFloorMin");
        sessionStorage.removeItem("siderFloorMax");
        // sessionStorage.removeItem("siderDesc");
        sessionStorage.removeItem("siderId");
        navigate('/result')
    }

    return (
        <div className='propType block'>
            <div className='propType__top'>
                <h2 className='title'>{t(type)}</h2>
                {data?.length
                    ? <button
                        className='propType__top-seeAll'
                        onClick={hanldeSeeById}
                    >
                        {t("seeAll")}{seeAll.icon}
                    </button>
                    : null}
            </div>

            {!data?.length
                ? <div className='skeleton__home'>
                    <Skeleton type="home" />
                </div>
                : <PropCard data={data} />
            }

            <button
                className='propType__top-seeAllMobile'
                onClick={hanldeSeeById}
            >
                {t("seeAll")}{seeAll.icon}
            </button>
        </div >
    )
}

export default PropType
