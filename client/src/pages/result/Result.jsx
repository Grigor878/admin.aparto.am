import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { filterOpen, openMap } from '../../assets/svgs/svgs'
import { useSessionState } from '../../hooks/useSessionState'
import { Sider } from './components/sider/Sider'
import { PropCard } from '../../components/propCard/PropCard'
import './Styles.scss'

const Result = () => {
  const { t } = useTranslation()

  const { searchResult, allPropertiesByTYpe } = useSelector((state => state.home))
  // console.log("searchRes", searchResult)//
  // console.log("allProperties", allPropertiesByTYpe)//

  const [open, setOpen] = useState(true)
  const [radio, setRadio] = useSessionState("sale", "result_radio")

  return (
    <div className='result'>
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
            <h2>{searchResult ? searchResult?.length : allPropertiesByTYpe?.length} {t("result")}</h2>
          </div>

          <button onClick={() => alert("Coming soon!")}>{openMap.icon} {t("map")}</button>
        </div>

        <PropCard data={searchResult ? searchResult : allPropertiesByTYpe} />
      </div>
    </div>
  )
}

export default Result