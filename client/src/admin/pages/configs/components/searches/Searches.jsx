import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearches } from '../../../../../store/slices/configsSlice'
import { Search } from '../../../../components/inputs/Search'
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import { calendar } from '../../../../svgs/svgs'
import Table from '../../../../components/table/Table'
import { searchColumns, searchTypes, searches } from './data'
import { Loader } from '../../../../../components/loader/Loader'
import './Searches.scss'

export const Searches = () => {
    const currentDate = new Date()
    const dateNow = currentDate?.toISOString().substring(0, 10)

    const [search, setSearch] = useState("")
    const [date, setDate] = useState(dateNow)
    const [select, setSelect] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSearches())
    }, [dispatch])

    // const { searches } = useSelector((state) => state.configs)
    // console.log(searches)//
    const [filteredData, setFilteredData] = useState(searches)

    useEffect(() => {
        if (searches) {
            // const filtered = searches.filter(row => {
            const filtered = filteredData.filter(row => {
                const text = row?.searchText?.toLowerCase()
                const searchValue = search.toLowerCase()

                return text?.includes(searchValue)

            })
            setFilteredData(filtered)
        }
    }, [filteredData, search])
    // }, [searches, search])


    const selectResultType = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setSelect(selectedValue);

        if (selectedValue === 1) {
            const filtered = searches.filter((row) => row.resultCount > 0);
            setFilteredData(filtered);
        } else if (selectedValue === 2) {
            const filtered = searches.filter((row) => row.resultCount === 0);
            setFilteredData(filtered);
        } else {
            setFilteredData(searches);
        }
    };

    const changeDate = (e) => {
        const inputDate = e.target.value
        const date = new Date(inputDate)

        if (!isNaN(date.getTime())) {
            const formattedDate = date.toISOString().substring(0, 10)
            setDate(formattedDate)
        } else {
            setDate('Invalid Date')
        }
    };

    // console.log(date);

    return (
        <section className='searches'>
            <div className='searches__top'>
                <Search
                    value={search}
                    placeholder="Փնտրել"
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <div className='searches__top-right'>
                    <select
                        className="dash__input-dropdown"
                        value={select}
                        // onChange={(e) => setSelect(e.target.value)}
                        onChange={selectResultType}
                    >
                        <option value={0}>Search Types</option>
                        {searchTypes?.map(({ id, value }) => {
                            return (
                                <option key={id} value={id}>{value}</option>
                            )
                        })}
                    </select>

                    <label htmlFor="dateInput" className='searches__top-right-picker'>
                        <input
                            type="date"
                            id="dateInput"
                            onChange={changeDate}
                            value={date}
                        />
                    </label>
                </div>
            </div>

            <div className='searches__bottom'>
                {!searches.length && !filteredData?.length
                    ? <Loader />
                    : <Table
                        Data={filteredData}
                        Columns={searchColumns}
                    // type="searches"
                    />}
            </div>
        </section>
    )
}


// {/* <DatePicker
//                         className='searches__top-right-picker'
//                         selected={date}
//                         onChange={(date) => setDate(date)}
//                         disabledKeyboardNavigation
//                         placeholderText="Date Range"
//                         dateFormat="dd/MM/yyyy"
//                         withPortal
//                     />
//                     <span>{calendar.icon}</span> */}