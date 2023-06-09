import React, { useState } from 'react'
import { Search } from '../../../../components/inputs/Search'
import { AdvancedBtn } from '../inputs/AdvancedBtn'
import { Drowpdown } from '../../../../components/dropdowns/Drowpdown'
import { SaleRent, EstateType, Community, Rooms, BuildingType, Floor, Taxation, Situation, Status } from './data'
import { InputSymbol } from '../inputs/InputSymbol'
import { BtnCustom } from '../../../../components/buttons/BtnCustom'

export const SearchBox = ({ data }) => {
    const [search, setSerach] = useState('')
    const [active, setActive] = useState(true)
    const [properties, setProperties] = useState('')

    const handleSearch = (value) => {
        setSerach(value)
    }
    console.log(search)

    const filteredData = data?.filter((item) => {
        return item.searchAllProperty.includes(search)
    })
    console.log(data);
    console.log(filteredData);

    const propertiesSearch = (e) => {
        let { id, value } = e.target

        setProperties((prev) => {
            return { ...prev, [id]: value }
        })
    }

    const submitSearch = (e) => {
        e.preventDefault()
        console.log(properties)
    }
    // AddUsersi pes data ov anel
    return (
        <div className="properties__searchbox">
            <div className="properties__searchbox-top">
                <Search
                    value={search}
                    placeholder='Search by ID, Property Name, Phone, Owner or Agent'
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <AdvancedBtn
                    status={active}
                    onClick={() => active ? setActive(false) : setActive(true)}
                />
            </div>

            <form id="propertiesSearch" onSubmit={submitSearch} className='properties__searchbox-form'>
                <div className={"properties__searchbox-form-open"}>
                    <Drowpdown
                        id='prop_salerent'
                        onChange={propertiesSearch}
                        data={SaleRent}
                        width="200px"
                    />
                    <Drowpdown
                        id='prop_estate'
                        onChange={propertiesSearch}
                        data={EstateType}
                        width="200px"
                    />
                    <Drowpdown
                        id='prop_community'
                        onChange={propertiesSearch}
                        data={Community}
                        width="200px"
                    />
                    {/* Zerov grel rooms u harkanutyun*/}
                    <Drowpdown
                        id='prop_rooms'
                        onChange={propertiesSearch}
                        data={Rooms}
                        width="200px"
                    />
                    <InputSymbol
                        id='prop_minPrice'
                        type="number"
                        placeholder="Գին մին."
                        name="price"
                        onChange={propertiesSearch}
                        width="145px"
                    />
                    <InputSymbol
                        id='prop_maxPrice'
                        type="number"
                        placeholder="Գին մաքս."
                        name="price"
                        onChange={propertiesSearch}
                        width="145px"
                    />
                </div>
                <div className={active ? "properties__searchbox-form-close" : "properties__searchbox-form-open"}>
                    <Drowpdown
                        id='prop_buildType'
                        onChange={propertiesSearch}
                        data={BuildingType}
                        width="200px"
                    />
                    <Drowpdown
                        id='prop_floor'
                        onChange={propertiesSearch}
                        data={Floor}
                        width="160px"
                    />
                    <Drowpdown
                        id='prop_tax'
                        onChange={propertiesSearch}
                        data={Taxation}
                        width="160px"
                    />
                    <Drowpdown
                        id='prop_situation'
                        onChange={propertiesSearch}
                        data={Situation}
                        width="220px"
                    />
                    <InputSymbol
                        id='prop_minSquare'
                        type="text"
                        placeholder="Մակերես մին."
                        onChange={propertiesSearch}
                        width="175px"
                    />
                    <InputSymbol
                        id='prop_maxSquare'
                        type="text"
                        placeholder="Մակերես մաքս."
                        onChange={propertiesSearch}
                        width="175px"
                    />
                </div>
                <div className={active ? "properties__searchbox-form-close" : "properties__searchbox-form-open"}>
                    <Drowpdown
                        id='prop_status'
                        onChange={propertiesSearch}
                        data={Status}
                        width="200px"
                    />
                </div>
                <div>
                    <BtnCustom
                        form="propertiesSearch"
                        text="Փնտրել"
                    />
                </div>
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