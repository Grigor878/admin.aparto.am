import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './components/nav/Nav'
import Smm from './components/smm/Smm'
import { customerData, ownersData, sourcesData, contactData } from './data'
import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className='footer'>
          <Link to='/'><h1>Logo</h1></Link>
          <Nav title="For Customers" data={customerData} />
          <Nav title="For Owners" data={ownersData} />
          <Nav title="Other Sources" data={sourcesData} />
          <Smm title="Contact" data={contactData} />
        </div>
      </div>
    </footer >
  )
}

export default Footer