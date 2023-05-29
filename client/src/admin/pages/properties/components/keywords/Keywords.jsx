import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setKeyword } from '../../../../../store/slices/propertySlice'
import { removeKeyword } from '../../../../svgs/svgs'
import './Keywords.scss'
import { error } from '../../../../../components/swal/swal'

export const Keywords = ({ title, style, value }) => {
    const [keywords, setKeywords] = useState(value ? value : [])
    
    const dispatch = useDispatch()

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            const text = e.target.value.trim()
            if (text !== '') {
                const lowercaseText = text.toLowerCase()
                if (!keywords.some((keyword) => keyword.toLowerCase() === lowercaseText)) {
                    setKeywords([...keywords, text])
                } else {
                    error('Keyword already exist!')
                }
                e.target.value = ''
            }
        }
    };

    const deleteKey = (index) => {
        setKeywords(keywords.filter((i) => i !== index))
    }

    useEffect(() => {
        dispatch(setKeyword(keywords))
    }, [dispatch, keywords])

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
                {keywords.length
                    ? <ul className='keywords__addeds-list'>
                        {keywords.map((e) => (
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
