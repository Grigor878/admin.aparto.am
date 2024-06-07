import React from 'react'
import { useTranslation } from 'react-i18next'
import { Accordion } from './component/Accordion'
import './Faq.scss'

const Faq = () => {
    const { t } = useTranslation()

    return (
        <div className='faq block'>
            <div className="faq__left">
                <h2 className='title'>{t("faq_title")}</h2>

                <div className='faq__left-text'>
                    <p>{t("faq_text")}</p>
                    <a href="#contact">{t("header_contact")}</a>
                </div>
            </div>

            <div className="faq__right">
                <Accordion />
            </div>
        </div>
    )
}

export default Faq