import React from 'react'
import { NavLink } from 'react-router-dom'
import { dashboardRoutes } from './data'
import "./Paths.scss"

const Paths = () => {
    return (
        <ul className='sidebar__list'>
            {dashboardRoutes.map((el) => {
                return (
                    <li key={el.id}>
                        <NavLink
                            className="sidebar__list-navlink"
                            to={el.path}
                        >
                            {el.img.icon}
                            {el.name}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    )
}

export default Paths