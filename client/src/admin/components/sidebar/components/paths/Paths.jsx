import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { adminDashboardRoutes, dashboardRoutes } from './data'
import { setPage } from '../../../../../store/slices/usersSlice'
import "./Paths.scss"

const Paths = () => {
    const { userGlobal } = useSelector((state => state?.userGlobal))
    const dispatch = useDispatch()

    return (
        <ul className='sidebar__list'>
            {userGlobal?.role === "admin"
                ? adminDashboardRoutes.map((el) => {
                    return (
                        <li key={el.id}>
                            <NavLink
                                className="sidebar__list-navlink"
                                to={el.path}
                                onClick={() => el.path === "properties" ? dispatch(setPage(1)) : null}
                            >
                                {el.img.icon}
                                {el.name}
                            </NavLink>
                        </li>
                    )
                })
                : dashboardRoutes.map((el) => {
                    return (
                        <li key={el.id}>
                            <NavLink
                                className="sidebar__list-navlink"
                                to={el.path}
                                onClick={() => el.path === "properties" ? dispatch(setPage(1)) : null}
                            >
                                {el.img.icon}
                                {el.name}
                            </NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Paths