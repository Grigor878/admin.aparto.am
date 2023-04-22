import React, { useState } from 'react'
import { Search } from '../inputs/Search'
import { AdvancedBtn } from '../inputs/AdvancedBtn'
import { Drowpdown } from '../../../../components/dropdowns/Drowpdown'
import { SaleRent, EstateType, Community, Rooms, BuildingType, Floor, Taxation, Situation, Status } from './data'
import { InputSymbol } from '../inputs/InputSymbol'
import { BtnCustom } from '../../../../components/buttons/BtnCustom'

export const SearchBox = () => {
    const [search, setSeach] = useState('')
    const [active, setActive] = useState(true)
    const [properties, setProperties] = useState('')

    const propertiesSearch = (e) => {
        let { id, value } = e.target

        setProperties((prev) => {
            return { ...prev, [id]: value }
        })
    }

    const submitSearch = (e) => {
        e.preventDefault();
        console.log(properties);

    }
    // AddUsersi pes data ov anel
    return (
        <div className="properties__searchbox">
            <div className="properties__searchbox-top">
                <Search
                    value={search}
                    onChange={(e) => setSeach(e.target.value)}
                />
                <AdvancedBtn
                    onClick={() => active ? setActive(false) : setActive(true)}
                    status={active}
                />
            </div>

            <form id="propertiesSearch" onSubmit={submitSearch} className='properties__searchbox-form'>
                <div className={"properties__searchbox-form-open"}>
                    <Drowpdown
                        id='prop_salerent'
                        onChange={propertiesSearch}
                        data={SaleRent}
                    />
                    <Drowpdown
                        id='prop_estate'
                        onChange={propertiesSearch}
                        data={EstateType}
                    />
                    <Drowpdown
                        id='prop_community'
                        onChange={propertiesSearch}
                        data={Community}
                    />
                    <Drowpdown
                        id='prop_rooms'
                        onChange={propertiesSearch}
                        data={Rooms}
                    />
                    <InputSymbol
                        id='prop_minPrice'
                        placeholder="Min Price"
                        name="price"
                        onChange={propertiesSearch}
                    />
                    <InputSymbol
                        id='prop_maxPrice'
                        placeholder="Max Price"
                        name="price"
                        onChange={propertiesSearch}
                    />
                </div>
                <div className={active ? "properties__searchbox-form-close" : "properties__searchbox-form-open"}>
                    <Drowpdown
                        id='prop_buildType'
                        onChange={propertiesSearch}
                        data={BuildingType}
                    />
                    <Drowpdown
                        id='prop_floor'
                        onChange={propertiesSearch}
                        data={Floor}
                    />
                    <Drowpdown
                        id='prop_tax'
                        onChange={propertiesSearch}
                        data={Taxation}
                    />
                    <Drowpdown
                        id='prop_situation'
                        onChange={propertiesSearch}
                        data={Situation}
                    />
                    <InputSymbol
                        id='prop_minSquare'
                        placeholder="Min Square"
                        onChange={propertiesSearch}
                    />
                    <InputSymbol
                        id='prop_maxSquare'
                        placeholder="Max Square"
                        onChange={propertiesSearch}
                    />
                </div>
                <div className={active ? "properties__searchbox-form-close" : "properties__searchbox-form-open"}>
                    <Drowpdown
                        id='prop_status'
                        onChange={propertiesSearch}
                        data={Status}
                    />
                </div>
                <BtnCustom
                    form="propertiesSearch"
                    text="Search"
                />
            </form>
        </div>
    )
}

// For edit and view
// <Drowpdown
// value={situation}
// onChange={(e) => setSituation(e.target.value)}
// data={Situation}
// />