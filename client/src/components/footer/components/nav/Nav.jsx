import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ title, data }) => {
    return (
        <nav className="footer__nav">
            <h4>{title}</h4>
            <ul>
                {data.map(({ id, name, path }) => (
                    <li key={id}>
                        <NavLink to={path}>{name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav