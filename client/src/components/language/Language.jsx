import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languageData } from './data'
import cookies from 'js-cookie'
import Flag from 'react-world-flags'

const Language = () => {
    const { i18n } = useTranslation()
    const ref = useRef()
    const [openLang, setOpenLang] = useState(false)

    // const handleOpenLang = () => {
    //     setOpenLang(!openLang);
    // }

    const handleChangeLang = (code) => {
        setOpenLang(false)
        i18n.changeLanguage(code) // or i18next & import i18next from 'i18next'
        cookies.set('lng', code)
        console.log(`Language changed to ${code}`)
    };

    return (
        <div ref={ref}>
            {/* <button
                className="language__btn"
                onClick={handleOpenLang}
            >
            </button> */}

            <ul className={!openLang ? "language__dropdown" : "language__dropdown-active"}>
                {languageData.map(({ code, name, country_code }) => (
                    <li key={country_code} onClick={() => handleChangeLang(code)}>
                        {/* <p>{name}</p> */}
                        <Flag
                            code={country_code}
                            width="20"
                            height="20"
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Language