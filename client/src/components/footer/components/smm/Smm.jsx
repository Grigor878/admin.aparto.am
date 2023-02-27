import React from 'react'
import './Smm.scss'

const Smm = ({ title, data }) => {
    return (
        <nav className='footer__smm'>
            <h4>{title}</h4>
            <ul className='footer__smm-list'>
                {data.map(({ id, name, href }) => (
                    <li key={id}>
                        <a href={href}>{name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Smm