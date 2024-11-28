import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive';
import { service } from './data'
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import './Services.scss'

const Services = () => {
    const { t } = useTranslation()

    const laptop = useMediaQuery({ maxWidth: 1280 })

    const scrollableDivRef = useRef(null)
    const scrollableDiv = scrollableDivRef.current
    const scroll = laptop ? 382 : 408

    return (
        <div className='service block' id="services">
            <h2 className='title'>{t("header_service")}</h2>

            <div className='service__row' ref={scrollableDivRef}>
                <AiOutlineArrowLeft className="scrollLeft" onClick={() => scrollableDiv.scrollLeft -= scroll} />
                {service?.map(({ id, to, img, title, desc }) => {
                    return (
                        <Link key={id} to={to} className="service__col">
                            {img}
                            <h4>{t(title)}</h4>
                            <p>{t(desc)}</p>
                        </Link>
                    )
                })}
                <AiOutlineArrowRight className="scrollRight" onClick={() => scrollableDiv.scrollLeft += scroll} />
            </div>
        </div>
    )
}

export default Services