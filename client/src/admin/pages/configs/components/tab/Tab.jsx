import React from 'react'
import '../../Configs.scss'

export const Tab = ({ active, setActive }) => {

  return (
    <nav className='configs__nav'>
      <ul className='configs__nav-list'>
        <li
          onClick={() => setActive(true)}
          className={active ? 'configs__nav-linkActive' : 'configs__nav-link'}
        >
          Որոնումներ
        </li>
        <li
          onClick={() => setActive(false)}
          className={active ? 'configs__nav-link' : 'configs__nav-linkActive'}

        >
          Հասցեներ
        </li>
      </ul>

      {active
        ? <h3>Օգտատերերի Որոնումներ</h3>
        : <h3>Հասցեներ</h3>
      }
    </nav>
  )
}
