import React from 'react'
import './Styles.scss'

export const Checkbox = ({ style, id, onChange, title }) => {
    return (
        <div style={{ width: style }} className='checkbox'>
            <input
                type="checkbox"
                id={id}
                onChange={onChange} />
            {title}
        </div>
    )
}
