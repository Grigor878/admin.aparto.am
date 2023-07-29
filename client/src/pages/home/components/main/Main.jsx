import React from 'react'
import { useTranslation } from 'react-i18next'
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
                        <p>1500+<span>Գրանցված<br /> անշարժ գույք</span></p>
                        <p>100+<span>Երջանիկ<br /> հաճախորդ</span></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main

