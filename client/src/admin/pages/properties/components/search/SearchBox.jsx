import React, { useState } from 'react'
import { Search } from '../inputs/Search'
import { BtnAdvanced } from '../inputs/BtnAdvanced'
import { Drowpdown } from '../../../../components/dropdowns/Drowpdown'
import { SaleRent, EstateType, Community, Rooms } from './data'

export const SearchBox = () => {
    const [search, setSeach] = useState('')
    const [active, setActive] = useState(true)
    const [saleRent, setSaleRent] = useState('')
    const [estateType, setEstateType] = useState('')
    const [community, setCommunity] = useState('')
    const [rooms, setRooms] = useState('')

    return (
        <div className="properties__searchbox">
            <div className="properties__searchbox-top">
                <Search
                    value={search}
                    onChange={(e) => setSeach(e.target.value)}
                />
                <BtnAdvanced
                    onClick={() => active ? setActive(false) : setActive(true)}
                    status={active}
                />
            </div>

            <div className={active ? "properties__searchbox-advancedClose" : "properties__searchbox-advancedOpen"}>
                <Drowpdown
                    value={saleRent}
                    onChange={(e) => setSaleRent(e.target.value)}
                    data={SaleRent}
                />
                <Drowpdown
                    value={estateType}
                    onChange={(e) => setEstateType(e.target.value)}
                    data={EstateType}
                />
                <Drowpdown
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    data={Community}
                />
                <Drowpdown
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    data={Rooms}
                />
            </div>
        </div>
    )
}
