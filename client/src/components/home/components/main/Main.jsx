import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Search } from '../search/Search'
import './Main.scss'

const Main = () => {
    const { t } = useTranslation()

    return (
        <main className='main'>
            <div className="contain">
                <div className='main__context'>
                    <h1 dangerouslySetInnerHTML={{ __html: t("main_title") }} />

                    <Search />

                    <div className="main__context-about">
                        <p>1500+<span><Trans i18nKey="registered_properties" components={{ 1: <br /> }} /></span></p>
                        <p>100+<span><Trans i18nKey="happy_customers" components={{ 1: <br /> }} /></span></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main

