import React from 'react'
import Paths from './components/paths/Paths'
import User from './components/user/User'
import './Sidebar.scss'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h1>Logo</h1>

      <nav className='sidebar__nav'>
        <Paths />
        <User/>
      </nav>
    </div>
  )
}

export default Sidebar