import React, { useState } from 'react'
import { Search } from '../inputs/Search'
import { BtnAdvanced } from '../inputs/BtnAdvanced'
import { CustomDrop } from '../../../../components/dropdowns/CustomDrop'
import { SaleRent, EstateType, Community, Rooms } from './data'

export const SearchBox = () => {
    const [search, setSeach] = useState('')
    const [active, setActive] = useState(true)
    const [saleRent, setSaleRent] = useState('')
    const [estateType, setEstateType] = useState('')
    const [community, setCommunity] = useState('')
    const [rooms, setRooms] = useState('')

    const handleSearch = (e) => {
        setSeach(e.target.value)
    }
    const handleAdvanced = () => {
        active ? setActive(false) : setActive(true)
    }

    const handleSaleRent = (e) => {
        setSaleRent(e.target.value)
    }

    const handleEstateType = (e) => {
        setEstateType(e.target.value)
    }

    const handleCommunity = (e) => {
        setCommunity(e.target.value)
    }

    const handleRooms = (e) => {
        setRooms(e.target.value)
    }

    return (
        <div className="properties__searchbox">
            <div className="properties__searchbox-top">
                <Search
                    value={search}
                    onChange={handleSearch}
                />
                <BtnAdvanced
                    onClick={handleAdvanced}
                    status={active}
                />
            </div>

            <div className={active ? "properties__searchbox-advancedClose" : "properties__searchbox-advancedOpen"}>
                <CustomDrop
                    value={saleRent}
                    onChange={handleSaleRent}
                    data={SaleRent}
                />
                <CustomDrop
                    value={estateType}
                    onChange={handleEstateType}
                    data={EstateType}
                />
                <CustomDrop
                    value={community}
                    onChange={handleCommunity}
                    data={Community}
                />
                <CustomDrop
                    value={rooms}
                    onChange={handleRooms}
                    data={Rooms}
                />
            </div>
        </div>
    )
}
