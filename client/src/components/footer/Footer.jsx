import React from 'react'
import { getCurrentYear } from '../../helpers/utils'
import './Footer.scss'

const Footer = () => {
  return (
    <footer id='contact'>
      <div className='footer'>
        <div className="contain">
          <div className="footer__context">
            <p>ⓒ Aparto {getCurrentYear()} | All Rights Reserved</p>

            <p>Website design & development by <span>Shark Innovations</span></p>
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer