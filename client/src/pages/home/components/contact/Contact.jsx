import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { tel, mail, fb, tiktok, insta, map } from '../../../../assets/svgs/svgs'
import './Contact.scss'

const Contact = () => {
    const { t } = useTranslation()

    const { admin } = useSelector((state => state.home))

    const adminTel = admin?.phone?.tel1

    return (
        <div className='contact'>
            <div className="contain">
                <div className="contact__main">
                    <div className="contact__main-right">
                        <h2>{t("header_contact")}</h2>

                        <div className='contact__main-right-info'>
                            {adminTel && <a href={`tel:${adminTel}`}>{tel.icon} {adminTel}</a>}
                            <a href="mailto:info@aparto.am">{mail.icon}info@aparto.am</a>
                        </div>

                        <div className='contact__main-right-social'>
                            <a href="https://www.facebook.com/apartorealestate/" target='/blank'>{fb.icon}</a>
                            <a href="https://www.tiktok.com/@aparto.am" target='/blank'>{tiktok.icon}</a>
                            <a href="https://www.instagram.com/aparto.am/" target='/blank'>{insta.icon}</a>
                        </div>
                    </div>

                    <div className="contact__main-left">
                        <iframe
                            title='contactMap'
                            className="contact__main-left-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.165526896787!2d44.51766107591142!3d40.1831295698241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce43f0f01ab%3A0xa6ddbea3e72ceeed!2s19%2F1%20Sayat-Nova%20Ave%2C%20Yerevan!5e0!3m2!1sru!2sam!4v1689950935732!5m2!1sru!2sam"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        <h5>{map.icon} {t("contact_map")}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact