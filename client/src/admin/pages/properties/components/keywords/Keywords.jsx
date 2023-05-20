import React, { useEffect, useState } from 'react'
import { removeKeyword } from '../../../../svgs/svgs'
import './Keywords.scss'

export const Keywords = ({ id, title, style, onChange }) => {
    const [keyword, setKeyword] = useState([]);

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            const text = event.target.value.trim();
            if (text !== '') {
                setKeyword([...keyword, text]);
                event.target.value = '';
            }
        }

    }

    const deleteKey = (index) => {
        setKeyword(keyword.filter((i) => i !== index))
    }

    // console.log(keyword)//

    return (
        <div className='keywords'>
            <label className='addproperties__card-text'>
                {title}
                <input
                    type="text"
                    placeholder="Մուտքագրեք բանալի բառեր"
                    onKeyDown={handleKeyDown}
                    style={{ width: style }}
                    className='addproperties__card-text-full'
                />
            </label>

            <p>ընտրված բառեր</p>

            <div className='keywords__addeds'>
                {keyword.length
                    ? <ul className='keywords__addeds-list'>
                        {keyword.map((e) => (
                            <li key={e} className='keywords__addeds-link'>
                                {e}<button type="button" onClick={() => deleteKey(e)}>{removeKeyword.icon}</button>
                            </li>
                        ))}
                    </ul>
                    : null
                }
            </div>


        </div>
    )
}
