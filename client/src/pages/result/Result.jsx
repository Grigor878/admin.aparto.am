import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { filterOpen, openMap } from '../../assets/svgs/svgs'
import { Sider } from './components/sider/Sider'
import { PropCard } from '../../components/propCard/PropCard'
import './Styles.scss'
import { getAllPropertiesByType } from '../../store/slices/homeSlice'
import { Loader } from '../../components/loader/Loader'

const Result = () => {
  const { t } = useTranslation()

  const { propertyType, loading, searchResult, allPropertiesByType } = useSelector((state => state.home))
  const { resultData } = useSelector((state => state.view))
  console.log(resultData);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPropertiesByType({ "type": propertyType }))
  }, [dispatch, propertyType])

  const [open, setOpen] = useState(true)
  const [radio, setRadio] = useState(propertyType)

  return (
    loading
      ? <Loader />
      : <div className='result'>
        <Sider
          open={open}
          setOpen={setOpen}
          radio={radio}
          setRadio={setRadio}
        />

        {/* article */}
        <div className='result__center' >
          <div className='result__center-top'>
            <div className='result__center-top-right'>
              {!open &&
                <button onClick={() => setOpen(true)}>
                  {filterOpen.icon}
                </button>}
              <h2>{resultData ? resultData?.length : searchResult ? searchResult?.length : allPropertiesByType?.length} {t("result")}</h2>
            </div>

            <button onClick={() => alert("Coming soon!")}>{openMap.icon} {t("map")}</button>
          </div>

          <PropCard data={resultData ? resultData : searchResult ? searchResult : allPropertiesByType} />
        </div>
      </div>
  )
}

export default Result