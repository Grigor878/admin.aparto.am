import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSessionState } from '../../../../../hooks/useSessionState'
import { accordionData } from './data'
import './Accordion.scss'

export const Accordion = () => {
    const { t } = useTranslation()

    const [activeIndex, setActiveIndex] = useSessionState(0, "homeFaq")

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
    }

    return (
        <div className='accordion'>
            {accordionData?.map((el, index) => (
                <div
                    key={index}
                    className={`accordion__section ${activeIndex === index ? 'openedFaq' : ''}`}
                    onClick={() => toggleAccordion(index)}
                >
                    <h4 className='accordion__title'>{t(el.title)}</h4>
                    <div className='accordion__content'>
                        {activeIndex === index && <p>{t(el.text)}</p>}
                    </div>
                </div>
            ))}
        </div>
    )
}
