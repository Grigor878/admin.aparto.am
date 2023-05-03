import React from 'react'
import TopPart from '../../components/topPart/TopPart'
import { SearchBox } from './components/searchBox/SearchBox'
import './Properties.scss'
import { List } from './components/list/List'

const Properties = () => {
    return (
        <article className='properties'>
            <TopPart />
            <SearchBox />
            <List />
        </article>
    )
}

export default Properties