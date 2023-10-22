import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertyData } from '../../../store/slices/propertySlice'
import { useNavigate } from 'react-router-dom'
import TopPart from '../../components/topPart/TopPart'
import { SearchBox } from './components/searchBox/SearchBox'
import { List } from './components/list/List'
import './Properties.scss'

const Properties = () => {
    const dispatch = useDispatch()

    const { filteredProperty, propertyData, filteredData } = useSelector((state) => state.property)
    const { page } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getPropertyData({ filteredProperty }))
    }, [dispatch, filteredProperty])

    const navigate = useNavigate()

    useEffect(() => {
        navigate(`?page=${page}`);
    }, [navigate, page])

    return (
        <article className='properties'>
            <TopPart
                data={filteredData === null ? propertyData : filteredData}
                type="properties"
            />
            <SearchBox />
            <List />
        </article>
    )
}

export default Properties