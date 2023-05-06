import React, { useEffect, useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { Card } from '../components/card/Card'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import Flag from 'react-world-flags'
import { TextLarg } from '../components/inputs/TextLarg'
// import { TextMid } from '../components/inputs/TextMid'
// import { TextSmall } from '../components/inputs/TextSmall'
// import { TextFull } from '../components/inputs/TextFull'
// import { TextMidPlus } from '../components/inputs/TextMidPlus'
import { agentList, balconiesNum, community, flags, houseCondition, kitchenType, moderatorList, parking, paymentProcedure, preferedBank, propertyType, roomsNum, statementType, toiletsNum, transactionType } from '../components/dropdowns/data'
// import { FileUpload } from '../components/inputs/FileUpload'
import baseApi from '../../../../apis/baseApi'
// import { NumPrice } from '../components/inputs/NumPrice'
// import { NumHug } from '../components/inputs/NumHug'
// import { NumSelector } from '../components/inputs/NumSelector'
import { AddedFields } from '../components/lngPart/LngPart'
import './Styles.scss'

const AddProperties = () => {
    const [addProperties, setAddProperties] = useState('')
    const [file, setFile] = useState([])
    // const [fileUrl, setFileUrl] = useState([])

    const [fields, setFields] = useState()
    const [propTitleLng, setPropTitleLng] = useState('am')
    const [propDescLng, setPropDescLng] = useState('am')
    // const [rooms, setRooms] = useState(null)
    // const [bedrooms, setBedrooms] = useState(null)
    // const [toilets, setToilets] = useState(null)
    // const [openBalconies, setOpenBalconies] = useState(null)
    // const [closeBalconies, setCloseBalconies] = useState(null)

    // old,only addeds
    // const getStrInfo = async () => {
    //     try {
    //         const { data } = await baseApi.get('/api/getAddFields')
    //         setStrInfo(data)
    //     } catch (err) {
    //         console.log(`Get Structure Info: ${err.message}`);
    //     }
    // }

    const getStrInfo = async () => {
        try {
            const { data } = await baseApi.get('/api/getAllStructure')
            setFields(data)
        } catch (err) {
            console.log(`Get Structure Info: ${err.message}`);
        }
    }
    console.log(fields)//

    useEffect(() => {
        getStrInfo()
    }, [])

    const uploadFile = (e) => {
        setFile(Object.values(e.target.files))
        // let newArray = Object.values(file)
        // console.log(newArray?.map(el => el.name))
    }

    const addProp = (e) => {
        let { id, value } = e.target

        setAddProperties((prev) => {
            return { ...prev, [id]: value }
        })
    }
    // console.log(addProperties)//


    return (
        <article className='addproperties'>
            <AddPart type="addProperties" />

            <div className='addproperties__main'>
                {/* Center part */}
                <div className='addproperties__center'>

                    {fields ? Object.keys(fields[0])?.map((el, idx) => (
                        console.log(el, idx)
                        // return (
                        //     <Card
                        //         key={el.name}
                        //         title={el.title}
                        //         child={
                        //             <div className='addproperties__card-block'>
                        //                 <div className='addproperties__card-row'>
                        //                     <SingleSelect
                        //                         id
                        //                         title={el.transactionType.title}
                        //                         data={el.transactionType.option}
                        //                         onChange={addProp}
                        //                     />
                        //                 </div>
                        //             </div>
                        //         }
                        //     />
                        // )
                    )) : null}

                    {/* <Card
                        title="Հայտարարություն"
                        child={
                            <div className='addproperties__card-block'>
                                <div className='addproperties__card-row'>
                                    <SingleSelect
                                        id="announcement_transactionType"
                                        title="Գործարքի տեսակ"
                                        data={transactionType}
                                        onChange={addProp}
                                    />
                                    <SingleSelect
                                        id="announcement_propertyType"
                                        title="Գույքի տեսակ"
                                        data={propertyType}
                                        onChange={addProp}
                                    />
                                </div>
                                <ul className='addproperties__card-flags'>
                                    {flags.map(({ country_code }) => (
                                        <li key={country_code} >
                                            <Flag
                                                code={country_code}
                                                onClick={() => setPropTitleLng(country_code)}
                                                width="36"
                                                height="20"
                                                className={propTitleLng === country_code ? 'addproperties__card-flags-flagActive' : 'addproperties__card-flags-flag'}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                {propTitleLng === "am"
                                    ? <TextLarg
                                        id="announcement_title-am"
                                        title="Հայտարարության վերնագիր"
                                        placeholder="Գրեք վերնագիրը"
                                        onChange={addProp}
                                    />
                                    : propTitleLng === "ru"
                                        ? <TextLarg
                                            id="announcement_title-ru"
                                            title="Հայտարարության վերնագիր RU"
                                            placeholder="Գրեք վերնագիրը"
                                            // placeholder="Напишите название"
                                            onChange={addProp}
                                        /> :
                                        <TextLarg
                                            id="announcement_title-en"
                                            title="Հայտարարության վերնագիր GB"
                                            placeholder="Գրեք վերնագիրը"
                                            // placeholder="Write the title"
                                            onChange={addProp}
                                        />
                                }
                                <ul className='addproperties__card-flags'>
                                    {flags.map(({ country_code }) => (
                                        <li key={country_code} >
                                            <Flag
                                                onClick={() => setPropDescLng(country_code)} code={country_code}
                                                width="36"
                                                height="20"
                                                className={propDescLng === country_code ? 'addproperties__card-flags-flagActive' : 'addproperties__card-flags-flag'}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                {propDescLng === "am"
                                    ? <TextLarg
                                        id="announcement_description-am"
                                        title="Հայտարարության նկարագրություն"
                                        placeholder="Գրեք նկարագրությունը"
                                        onChange={addProp}
                                    />
                                    : propDescLng === "ru"
                                        ? <TextLarg
                                            id="announcement_description-ru"
                                            title="Հայտարարության նկարագրություն RU"
                                            // placeholder="Напишите описание"
                                            placeholder="Գրեք նկարագրությունը"
                                            onChange={addProp}
                                        />
                                        : <TextLarg
                                            id="announcement_description-en"
                                            title="Հայտարարության նկարագրություն GB"
                                            // placeholder="Write the description"
                                            placeholder="Գրեք նկարագրությունը"
                                            onChange={addProp}
                                        />
                                }
                                <SingleSelect
                                    id="announcement_statementType"
                                    title="հայտարարության տեսակ"
                                    data={statementType}
                                    onChange={addProp}
                                />
                                
                                {fields
                                    ? <AddedFields
                                        data={fields?.am?.announcement}
                                        addProp={addProp}
                                    />
                                    : null}
                            </div>
                        }
                    /> */}
                    {/* <Card
                        title="Գտնվելու Վայրը - Երևան"
                        child={
                            <div className='addproperties__card-block'>
                                <SingleSelect
                                    id="location_community"
                                    title="Համայնք"
                                    data={community}
                                    onChange={addProp}
                                />
                                <div className='addproperties__card-row'>
                                    <TextMid
                                        id="location_street"
                                        title="Փողոց"
                                        placeholder="Հասցե"
                                        onChange={addProp}
                                    />
                                    <TextSmall
                                        id="location_house"
                                        title="Շենք"
                                        placeholder="Օրինակ"
                                        onChange={addProp}
                                    />
                                    <TextSmall
                                        id="place_entrance"
                                        title="մուտք"
                                        placeholder="Օրինակ"
                                        onChange={addProp}
                                    />
                                    <TextSmall
                                        id="location_apartment"
                                        title="Բնակարան"
                                        placeholder="Օրինակ"
                                        onChange={addProp}
                                    />
                                </div>
                                <p>Yandex map</p>
                                <TextFull
                                    id="location_realAddress"
                                    title="իրական հասցե"
                                    placeholder="Հասցե"
                                    onChange={addProp}
                                />
                            </div>
                        }
                    />
                    <Card
                        title='Գինը'
                        child={
                            <div className='addproperties__card-block'>
                                <div className='addproperties__card-rowGap'>
                                    <NumPrice
                                        title="Ընդհանուր Գինը*"
                                        id="price_usd"
                                        placeholder="Գինը դոլարով"
                                        onChange={addProp}
                                        ex="USD"
                                    />
                                    <NumPrice
                                        title='.'
                                        id="price_amd"
                                        placeholder="Գինը դրամով"
                                        onChange={addProp}
                                        ex="AMD"
                                    />
                                    <NumPrice
                                        title='.'
                                        id="price_rub"
                                        placeholder="Գինը ռուբլիով"
                                        onChange={addProp}
                                        ex="RUB"
                                    />
                                </div>
                                <p>Gin paymanagrayin</p>
                                <div className='addproperties__card-rowGap'>
                                    <NumPrice
                                        title="Գինը 1 քմ*"
                                        id="price_sqm-usd"
                                        placeholder="Գինը դոլարով"
                                        onChange={addProp}
                                        ex="USD"
                                    />
                                    <NumPrice
                                        title='.'
                                        id="price_sqm-amd"
                                        placeholder="Գինը դրամով"
                                        onChange={addProp}
                                        ex="AMD"
                                    />
                                    <NumPrice
                                        title='.'
                                        id="price_sqm-rub"
                                        placeholder="Գինը ռուբլիով"
                                        onChange={addProp}
                                        ex="RUB"
                                    />
                                </div>
                                <div className='addproperties__card-rowGap'>
                                    <NumPrice
                                        title="Կանխավճարի չափ*"
                                        id="price_advancedPay-usd"
                                        placeholder="Գինը դոլարով"
                                        onChange={addProp}
                                        ex="USD"
                                    />
                                    <NumPrice
                                        title='.'
                                        id="price_advancedPay-amd"
                                        placeholder="Գինը դրամով"
                                        onChange={addProp}
                                        ex="AMD"
                                    />
                                    <NumPrice
                                        title='.'
                                        id="price_advancedPay-rub"
                                        placeholder="Գինը ռուբլիով"
                                        onChange={addProp}
                                        ex="RUB"
                                    />
                                </div>
                                <div className="addproperties__card-row">
                                    <SingleSelect
                                        id="price_paymentProcedure"
                                        title="վճարման կարգը"
                                        data={paymentProcedure}
                                        onChange={addProp}
                                    />
                                    <SingleSelect
                                        id="price_preferedBank"
                                        title="Նախընտրած բանկը"
                                        data={preferedBank}
                                        onChange={addProp}
                                    />
                                </div>
                            </div>
                        }
                    />
                    <Card
                        title='Տան Նկարագիր'
                        child={
                            <div className='addproperties__card-block'>
                                <div className='addproperties__card-row'>
                                    <NumHug
                                        title="մակերես*"
                                        id=""
                                        placeholder="Նշեք մակերեսը"
                                        onChange={addProp}
                                        ex="մ.ք."
                                    />
                                    <NumHug
                                        title="Առաստաղի բարձրությունը*"
                                        id=""
                                        placeholder="Նշեք բարձրությունը"
                                        onChange={addProp}
                                        ex="մետր"
                                    />
                                </div>
                                <div className='addproperties__card-row'>
                                    <NumSelector
                                        title="Սենյակների քանակ*"
                                        data={roomsNum}
                                        state={rooms}
                                        setState={setRooms}
                                    />
                                    <NumSelector
                                        title="Սենյակների քանակ*"
                                        data={roomsNum}
                                        state={bedrooms}
                                        setState={setBedrooms}
                                    />
                                </div>

                                <NumSelector
                                    title="սահանգույցների քանակ*"
                                    data={toiletsNum}
                                    state={toilets}
                                    setState={setToilets}
                                />

                                <div className='addproperties__card-row'>
                                    <NumSelector
                                        title="բաց պատշգամբների քանակ*"
                                        data={balconiesNum}
                                        state={openBalconies}
                                        setState={setOpenBalconies}
                                    />
                                    <NumSelector
                                        title="փակ պատշգամբների քանակ*"
                                        data={balconiesNum}
                                        state={closeBalconies}
                                        setState={setCloseBalconies}
                                    />
                                </div>
                                <div className='addproperties__card-row'>
                                    <NumHug
                                        title="ՀԱՐԿԸ*"
                                        id="houseDescription_floor"
                                        placeholder="Ex."
                                        onChange={addProp}
                                    />
                                    <SingleSelect
                                        title="տան վիճակ"
                                        id="houseDescription_houseCondition"
                                        onChange={addProp}
                                        data={houseCondition}
                                    />
                                </div>

                                <div className='addproperties__card-row'>
                                    <SingleSelect
                                        title="ավտոկայանատեղի"
                                        id="houseDescription_parking"
                                        onChange={addProp}
                                        data={parking}
                                    />
                                    <SingleSelect
                                        title="ավտոկայանատեղի"
                                        id="houseDescription_kitchenType"
                                        onChange={addProp}
                                        data={kitchenType}
                                    />
                                </div>
                            </div>
                        }
                    /> */}
                </div>

                {/* Right part */}
                {/* <div className="addproperties__right">
                    <Card
                        title="Իրավաբանական"
                        child={
                            <div className='addproperties__card-block'>
                                <TextMidPlus
                                    id="juridical_ownerName"
                                    title="Սեփականատեր"
                                    placeholder='Գրեք սեփականատիրոջ անունը'
                                    onChange={addProp}
                                />
                                <TextMidPlus
                                    id="juridical_ownerPhone"
                                    title="սեփականատիրոջ հեռախոսահամար"
                                    placeholder='Գրեք սեփականատիրոջ հեռախոսահամարը'
                                    onChange={addProp}
                                />
                                <span>Ավելացնել սեփականատեր</span>
                            </div>
                        }
                    />
                    <Card
                        title="Լրացուցիչ Ինֆորմացիա"
                        child={
                            <div className='addproperties__card-block'>
                                <TextMidPlus
                                    id="additional_info"
                                    title="Ինֆորմացիա"
                                    placeholder='Գրեք նախընտրած ինֆորմացիան'
                                    onChange={addProp}
                                />
                                <FileUpload onChange={uploadFile} />
                                {file?.map(({ name }) => {
                                    return <p key={name}>{name}</p>
                                })}

                            </div>
                        }
                    />
                    <Card
                        title="Կից Մասնագետներ"
                        child={
                            <div className='addproperties__card-block'>
                                <SingleSelect
                                    id="specialist_agents"
                                    title="Գործակալ"
                                    data={agentList}
                                    onChange={addProp}
                                />
                                <SingleSelect
                                    id="specialist_moderators"
                                    title="Մենեջեր"
                                    data={moderatorList}
                                    onChange={addProp}
                                />
                            </div>
                        }
                    />
                </div> */}
            </div>
        </article>
    )
}

export default AddProperties

// import React, { useState } from 'react'
// import TopPart from '../../components/topPart/TopPart'
// import { SearchBox } from './components/search/SearchBox'
// import './Properties.scss'

// const Properties = () => {
//     const [val, setVal] = useState('')
//     const [sel, setSel] = useState()
//     const [languageSection, setLanguageSection] = useState('am')
//     const changeVal = (e) => {
//         const fieldName = e.target.dataset.fieldName;
//         let objAm = {
//             կդկդկ: "մկդմկդ "
//         }

//         if (languageSection == 'am') {

//         } else if (languageSection == 'ru') {

//         }
//         else if (languageSection == 'en') {

//         }
//         console.log(fieldName)
//         setVal(e.target.value)
//         console.log(e.target.dataset.fieldName, "seleet");
//         // setSel(e.target.dataset.fieldName)
//     }

//     return (
//         <article className='properties'>
//             <TopPart />
//             <SearchBox />
//             <button style={{ margin: '10px' }} onClick={() => setLanguageSection('am')}>Am</button>
//             <button style={{ margin: '10px' }} onClick={() => setLanguageSection('ru')}>Ru</button>
//             <button style={{ margin: '10px' }} onClick={() => setLanguageSection('en')}>En</button>
//             <input type='text' value={val} data-field-name="gorcarq" onChange={(e) => changeVal(e)} />
//             <br />
//             <select name="" data-field-name="test" value={sel} onChange={(e) => console.log(e.target.dataset.fieldName)}>
//                 <option value="a">sds</option>
//                 <option value="x">sdsd</option>
//                 <option value="z">sdsd</option>
//                 <option value="a">sdsd</option>

//                 <option value="">sdsd</option>
//             </select>
//         </article>
//     )
// }

// export default Properties