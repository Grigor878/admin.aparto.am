import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { lngs, pdfAm, pdfEn, pdfRu } from './data'
import { pdf } from '../../../../../assets/svgs/svgs'
import './PdfSwitcher.scss'

export const PdfSwitcher = () => {
    const { t } = useTranslation()

    const [active, setActive] = useState(cookies.get("i18next") || "am")
    // after adding dispatch in Header use it for async

    return (
        <div className='pdfSwitcher'>
            <h4>{t("contracts_pdfTitle")}</h4>

            <div className="pdfSwitcher__main">
                <div className="pdfSwitcher__main-lngs">
                    {lngs.map(({ id, value, name }) => {
                        return (
                            <button
                                className={`pdfSwitcher__main-lngs-btn ${value === active ? 'pdfSwitcher__main-lngs-btnActive' : ''}`}
                                key={id}
                                onClick={() => setActive(value)}
                            >{name}
                            </button>
                        )
                    })}
                </div>

                <div className="pdfSwitcher__main-pdfs">
                    {active === "am" ? pdfAm.map(({ id, name, file }) => {
                        return (
                            <a key={id} href={file} target='/blank'>{pdf.icon}{name}</a>
                        )
                    })
                        : active === "en" ? pdfEn.map(({ id, name, file }) => {
                            return (
                                <a key={id} href={file} target='/blank'>{pdf.icon}{name}</a>
                            )
                        }) : pdfRu.map(({ id, name, file }) => {
                            return (
                                <a key={id} href={file} target='/blank'>{pdf.icon}{name}</a>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
