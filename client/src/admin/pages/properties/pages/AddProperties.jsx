import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPart from '../../../components/addPart/AddPart'
import { getPropertyData, addPropertyData, addPropertyFiles, addPropertyImgs, addPropertyKeyword, addPropertyYandex } from '../../../../store/slices/propertySlice'
import { Loader } from '../../../../components/loader/Loader'
import { Card } from '../components/card/Card'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import { MultiSelect } from '../components/dropdowns/MultiSelect'
import { LngPart } from '../components/lngPart/LngPart'
// import { TextLarg } from '../components/inputs/TextLarg'
// import { TextMid } from '../components/inputs/TextMid'
// import { TextSmall } from '../components/inputs/TextSmall'
// import { TextFull } from '../components/inputs/TextFull'
// import { TextMidPlus } from '../components/inputs/TextMidPlus'
// import { agentList, balconiesNum, community, flags, houseCondition, kitchenType, moderatorList, parking, paymentProcedure, preferedBank, propertyType, roomsNum, statementType, toiletsNum, transactionType } from '../components/dropdowns/data'
// import { NumPrice } from '../components/inputs/NumPrice'
import { FileUpload } from '../components/inputs/FileUpload'
import { InputNum } from '../components/inputs/InputNum'
import { InputText } from '../components/inputs/InputText'
import YandexMap from '../../../../components/yandexMap/YandexMap'
import { InputNumSymbol } from '../components/inputs/InputNumSymbol'
import { NumSelector } from '../components/inputs/NumSelector'
import { Checkbox } from '../../../components/checkboxes/Checkbox'
import { Keywords } from '../components/keywords/Keywords'
import { ImgsUpload } from '../components/ImgsUpload/ImgsUpload'
import './Styles.scss'
import { AddOwner } from '../components/addOwner/AddOwner'

const AddProperties = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPropertyData())
    }, [dispatch])

    const { data } = useSelector((state) => state.property)
    const { yandex, keyword, uploadPhoto, uploadFile } = useSelector((state) => state.property)
    // console.log(data)
    // console.log(keyword)
    // console.log(yandex)
    // console.log(uploadPhoto)
    // console.log(uploadFile)

    const center = data?.slice(0, 9)
    const right = data?.slice(9, 12)

    const [addProperty, setAddProperty] = useState('')

    const addProp = (e, name, type) => {
        let { id, value, checked } = e.target;

        setAddProperty((prev) => {
            let obj = {};

            if (type === 'text') {
                const nestedKey = id.slice(0, -2);

                obj = {
                    [name]: {
                        ...prev[name],
                        [nestedKey]: {
                            ...prev[name]?.[nestedKey],
                            [id]: value,
                        },
                    },
                };
            } else {
                obj = {
                    [name]: {
                        ...prev[name],
                        [id]: checked ? checked : value,
                    },
                };
            }

            return { ...prev, ...obj };
        });
    };
    console.log(addProperty)//

    const handleSubmit = (e) => {
        e.preventDefault()

        // if (Object.keys(addProperties).length === 0) {
        //     alert('addProperties is empty')
        //     return
        // }

        // if (uploadPhoto.entries().next().done) {
        //     alert('uploadPhoto is empty')
        //     return
        // }

        // if (uploadFile.entries().next().done) {
        //     alert('uploadFile is empty')
        //     return
        // }

        dispatch(addPropertyData({ addProperty }))
        dispatch(addPropertyImgs({ uploadPhoto }))
        dispatch(addPropertyFiles({ uploadFile }))
        dispatch(addPropertyYandex({ yandex }))
        dispatch(addPropertyKeyword({ keyword }))
    };

    return (
        <article className='addproperties'>
            <AddPart type="addProperties" />

            {!data
                ? <Loader />
                : <form id="addPropertiesForm" onSubmit={handleSubmit} className='addproperties__main'>
                    {/* Center part */}
                    <div className='addproperties__center'>
                        {center?.map(({ name, title, fields, added }) => {
                            return (
                                <Card
                                    key={name}
                                    title={title}
                                    width="679px"
                                    child={fields.map(({ key, title, type, option, style, placeholder }) => {
                                        return (
                                            <div key={key}>
                                                {type === "select"
                                                    ? <SingleSelect
                                                        id={key}
                                                        title={title}
                                                        data={option}
                                                        style={style}
                                                        onChange={(e) => addProp(e, name)}
                                                    />
                                                    : type === "multiselect"
                                                        ? <MultiSelect
                                                            id={key}
                                                            title={title}
                                                            data={option}
                                                            style={style}
                                                        />
                                                        : type === "text"
                                                            ? <LngPart
                                                                id={key}
                                                                title={title}
                                                                style={style}
                                                                onChange={(e) => addProp(e, name, type)}
                                                            />
                                                            : type === "inputNumber"
                                                                ? <InputNum
                                                                    id={key}
                                                                    title={title}
                                                                    placeholder="Ex."
                                                                    style={style}
                                                                    onChange={(e) => addProp(e, name)}
                                                                />
                                                                : type === "inputText"
                                                                    ? <InputText
                                                                        id={key}
                                                                        title={title}
                                                                        placeholder={placeholder}
                                                                        style={style}
                                                                        onChange={(e) => addProp(e, name)}
                                                                    />
                                                                    : type === "map"
                                                                        ? <YandexMap
                                                                            title={title}
                                                                            style={style}
                                                                            height='200px'
                                                                        />
                                                                        : type === 'inputNumberSymbol'
                                                                            ? <InputNumSymbol
                                                                                id={key}
                                                                                title={title}
                                                                                data={option}
                                                                                style={style}
                                                                                onChange={(e) => addProp(e, name)}
                                                                            />
                                                                            : type === "checkbox"
                                                                                ? <Checkbox
                                                                                    id={key}
                                                                                    title={title}
                                                                                    style={style}
                                                                                    onChange={(e) => addProp(e, name)}
                                                                                />
                                                                                : type === "numSelect"
                                                                                    ? <NumSelector
                                                                                        id={key}
                                                                                        title={title}
                                                                                        data={option}
                                                                                        style={style}
                                                                                        onChange={(e) => addProp(e, name)}
                                                                                    />
                                                                                    : type === "keyword"
                                                                                        ? <Keywords
                                                                                            title={title}
                                                                                            style={style}
                                                                                        />
                                                                                        : type === "imgsUpload"
                                                                                            ? <ImgsUpload
                                                                                                style={style} />
                                                                                            : null
                                                }
                                            </div>
                                        )
                                    })
                                    }
                                />
                            )
                        })}
                    </div>

                    {/* Right part */}
                    <div className='addproperties__right'>
                        {right?.map(({ name, title, fields, added }) => {
                            return (
                                <Card
                                    key={name}
                                    title={title}
                                    width="460px"
                                    child={fields.map(({ key, title, type, option, style, height, placeholder }) => {
                                        return (
                                            <div key={key}>
                                                {type === "select"
                                                    ? <SingleSelect
                                                        id={key}
                                                        title={title}
                                                        data={option}
                                                        style={style}
                                                        onChange={(e) => addProp(e, name)}
                                                    />
                                                    : type === "inputNumber"
                                                        ? <InputNum
                                                            id={key}
                                                            title={title}
                                                            placeholder="Ex."
                                                            style={style}
                                                            onChange={(e) => addProp(e, name)}
                                                        />
                                                        : type === "inputText"
                                                            ? <InputText
                                                                id={key}
                                                                title={title}
                                                                placeholder={placeholder}
                                                                height={height}
                                                                style={style}
                                                                onChange={(e) => addProp(e, name)}
                                                            />
                                                            : type === "addField"
                                                                ? <AddOwner
                                                                    id={key}
                                                                    title={title}
                                                                    placeholder={placeholder}
                                                                    style={style}
                                                                    data={option}
                                                                    onChange={(e) => addProp(e, name)}

                                                                />
                                                                : type === "uploadFile"
                                                                    ? <FileUpload />
                                                                    : null
                                                }
                                            </div>
                                        )
                                    })
                                    }
                                />
                            )
                        })}
                    </div>
                </form>
            }
        </article>
    )
}

export default AddProperties

// const addProp = (e, name, type) => {
    //     let { id, value, checked, files } = e.target;

    //     console.log(name, type);

    //     setAddProperty((prev) => {
    //         let obj = {
    //             [name]: {
    //                 ...prev[name],
    //                 [id]: checked ? checked : value ? value : files,
    //             },
    //         };
    //         return { ...prev, ...obj };
    //     });
    // }

// if (!sendedImgs) {
//     dispatch(addPropertiesImgs({ uploadPhoto }))
// }
// if (!sendedFiles) {
//     dispatch(addPropertiesFiles({ uploadFile }))
// }
// if(!sendedImgs || !sendedFiles || addProperties.length){
//     dispatch(addPropertyData({addProperties}))
// }


    // old,only addeds
    // const getStrInfo = async () => {
    //     try {
    //         const { data } = await baseApi.get('/api/getAddFields')
    //         setStrInfo(data)
    //     } catch (err) {
    //         console.log(`Get Structure Info: ${err.message}`);
    //     }
    // }
