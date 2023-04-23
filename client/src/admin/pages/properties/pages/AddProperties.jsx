import React, { useState } from 'react'
import AddPart from '../../../components/addPart/AddPart'
import './Styles.scss'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import { propertyType, statementType, transactionType } from '../components/dropdowns/data'
import { Card } from '../components/card/Card'
import { TextArea } from '../components/inputs/TextArea'

const AddProperties = () => {
    const [addProperties, setAddProperties] = useState('')

    const addProp = (e) => {
        let { id, value } = e.target

        setAddProperties((prev) => {
            return { ...prev, [id]: value }
        })
    }
    console.log(addProperties)

    return (
        <article className='addproperties'>
            <AddPart type="addProperties" />

            <div className='addproperties__main'>
                <div className='addproperties__center'>
                    <Card
                        title="Announcement"
                        child={
                            <div className='addproperties__card-block'>
                                <div className='addproperties__card-row'>
                                    <SingleSelect
                                        id="property_transactionType"
                                        title="Transaction Type"
                                        data={transactionType}
                                        onChange={addProp}
                                    />
                                    <SingleSelect
                                        id="property_propertyType"
                                        title="Property Type"
                                        data={propertyType}
                                        onChange={addProp}
                                    />
                                </div>
                                <TextArea
                                    title="Title"
                                    id="property_title"
                                    placeholder="Write the title"
                                    onChange={addProp}
                                />
                                <TextArea
                                    title="Description"
                                    id="property_description"
                                    placeholder="Write the description"
                                    onChange={addProp}
                                />
                                <SingleSelect
                                    id="property__statementType"
                                    title="Property Type"
                                    data={statementType}
                                    onChange={addProp}
                                />
                            </div>
                        }
                    />
                </div>
                <div className="addproperties__right">
                    <Card
                        title="Juridical"
                        child={
                            <SingleSelect
                                id="add__propertyType"
                                title="juridical"
                                data={propertyType}
                                onChange={addProp}
                            />
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