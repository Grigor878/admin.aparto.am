import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Language from '../language/Language'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header>
      <nav>
        <NavLink to='/'>Logo</NavLink>
        <ul>
          <li>
            <NavLink to="/for-rent">{t('header_rent')}</NavLink>
            <NavLink to="/for-sale">{t('header_sale')}</NavLink>
            <NavLink to="/contact-us">{t('header_contact')}</NavLink>
          </li>
        </ul>

        <Language />
      </nav>
    </header>
  )
}

export default Header