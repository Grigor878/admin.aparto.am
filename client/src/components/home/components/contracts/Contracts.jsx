import React from 'react'
import { useTranslation } from 'react-i18next'
import './Contracts.scss'
import { PdfSwitcher } from './component/PdfSwitcher'

const Contracts = () => {
    const { t } = useTranslation()

    return (
        <div className='contracts'>
            <div className='contracts__context'>
                <h2>{t("contracts_title")}</h2>
                <a href="#contact">{t("contracts_btn")}</a>
            </div>

            <PdfSwitcher />
        </div>
    )
}

export default Contracts