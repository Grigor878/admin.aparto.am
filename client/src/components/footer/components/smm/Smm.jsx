import React from 'react'

const Smm = ({ title, data }) => {
    return (
        <nav>
            <h4>{title}</h4>
            <ul>
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