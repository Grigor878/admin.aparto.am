import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setKeywords } from '../../../../../store/slices/propertySlice'
import { removeKeyword } from '../../../../svgs/svgs'
import './Keywords.scss'

export const Keywords = ({ title, style }) => {
    const [keyword, setKeyword] = useState([])
    const dispatch = useDispatch()

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            const text = event.target.value.trim()
            if (text !== '') {
                setKeyword([...keyword, text]);
                event.target.value = ''
            }
        }
    }

    useEffect(() => {
        dispatch(setKeywords(keyword))
    }, [dispatch, keyword])

    const deleteKey = (index) => {
        setKeyword(keyword.filter((i) => i !== index))
    }

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
