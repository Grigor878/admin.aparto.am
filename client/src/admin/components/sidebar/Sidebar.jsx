import React from 'react'
import { Link } from 'react-router-dom'
import Paths from './components/paths/Paths'
import User from './components/user/User'
import './Sidebar.scss'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to="">
        <h1>Logo</h1>
      </Link>

      <nav className='sidebar__nav'>
        <Paths />
        <User />
      </nav>
    </div>
  )
}

export default Sidebar