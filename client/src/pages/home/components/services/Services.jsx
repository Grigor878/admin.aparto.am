import React from 'react'
import { useTranslation } from 'react-i18next'
import { service } from './data'
import './Services.scss'

const Services = () => {
    const { t } = useTranslation()

    return (
        <div className='service' id='service'>
            <h2 className='title'>{t("header_service")}</h2>

            <div className='service__row'>
                {service.map(({ id, img, title, desc }) => {
                    return (
                        <div key={id} className="service__col">
                            {img}
                            <h4>{t(title)}</h4>
                            <p>{t(desc)}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Services