import React from 'react'
import TopPart from '../../components/topPart/TopPart'
import { SearchBox } from './components/search/SearchBox'
import './Properties.scss'

const Properties = () => {
    return (
        <article className='properties'>
            <TopPart/>
            <SearchBox/>
        </article>
    )
}

export default Properties