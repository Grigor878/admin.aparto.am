import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import { Card } from '../components/card/Card'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import Flag from 'react-world-flags'
import { TextLarg } from '../components/inputs/TextLarg'
import { TextMid } from '../components/inputs/TextMid'
import { TextSmall } from '../components/inputs/TextSmall'
import { TextFull } from '../components/inputs/TextFull'
import { TextMidPlus } from '../components/inputs/TextMidPlus'
import { agentList, community, flags, moderatorList, propertyType, statementType, transactionType } from '../components/dropdowns/data'
import { FileUpload } from '../components/inputs/FileUpload'
import './Styles.scss'

const AddProperties = () => {
    const [addProperties, setAddProperties] = useState('')
    const [file, setFile] = useState([])
    // const [fileUrl, setFileUrl] = useState([])

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
    // console.log(addProperties)

    const propertyTitleLng = (code) => {
        alert(code)
    }

    return (
        <article className='addproperties'>
            <AddPart type="addProperties" />

            <div className='addproperties__main'>
                {/* Center part */}
                <div className='addproperties__center'>
                    <Card
                        title="Հայտարարություն"
                        child={
                            <div className='addproperties__card-block'>
                                <div className='addproperties__card-row'>
                                    <SingleSelect
                                        id="property_transactionType"
                                        title="Գործարքի տեսակ"
                                        data={transactionType}
                                        onChange={addProp}
                                    />
                                    <SingleSelect
                                        id="property_propertyType"
                                        title="Գույքի տեսակ"
                                        data={propertyType}
                                        onChange={addProp}
                                    />
                                </div>
                                <ul className='addproperties__card-flags'>
                                    {flags.map(({ code, country_code }) => (
                                        <li key={code} >
                                            <Flag
                                                onClick={() => propertyTitleLng(code)}
                                                code={country_code}
                                                width="36"
                                                height="20"
                                                style={{ borderRadius: "2px", border: " 1px solid #4A46F1" }}

                                            />
                                        </li>
                                    ))}
                                </ul>
                                <TextLarg
                                    id="property_title"
                                    title="Հայտարարության վերնագիր"
                                    placeholder="Գրեք վերնագիրը"
                                    onChange={addProp}
                                />
                                <ul className='addproperties__card-flags'>
                                    {flags.map(({ code, country_code }) => (
                                        <li key={code} >
                                            <Flag
                                                onClick={() => propertyTitleLng(code)}
                                                code={country_code}
                                                width="36"
                                                height="20"
                                                style={{ borderRadius: "2px", border: " 1px solid #4A46F1" }}

                                            />
                                        </li>
                                    ))}
                                </ul>
                                <TextLarg
                                    id="property_description"
                                    title="Հայտարարության նկարագրություն"
                                    placeholder="Գրեք նկարագրությունը"
                                    onChange={addProp}
                                />
                                <SingleSelect
                                    id="property_statementType"
                                    title="հայտարարության տեսակ"
                                    data={statementType}
                                    onChange={addProp}
                                />
                            </div>
                        }
                    />
                    <Card
                        title="Գտնվելու Վայրը - Երևան"
                        child={
                            <div className='addproperties__card-block'>
                                <SingleSelect
                                    id="place_community"
                                    title="Համայնք"
                                    data={community}
                                    onChange={addProp}
                                />
                                <div className='addproperties__card-row'>
                                    <TextMid
                                        id="place_street"
                                        title="Փողոց"
                                        placeholder="Հասցե"
                                        onChange={addProp}
                                    />
                                    <TextSmall
                                        id="place_house"
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
                                        id="place_apartment"
                                        title="Բնակարան"
                                        placeholder="Օրինակ"
                                        onChange={addProp}
                                    />
                                </div>
                                <TextFull
                                    id="place_realAddress"
                                    title="իրական հասցե"
                                    placeholder="Հասցե"
                                    onChange={addProp}
                                />
                            </div>
                        }
                    />
      
                </div>
                {/* Right part */}
                <div className="addproperties__right">
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
                </div>
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