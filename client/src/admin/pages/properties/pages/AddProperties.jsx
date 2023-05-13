import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPart from '../../../components/addPart/AddPart'
import { Card } from '../components/card/Card'
import { LngPart } from '../components/lngPart/LngPart'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import { Loader } from '../../../../components/loader/Loader'
// import { TextLarg } from '../components/inputs/TextLarg'
// import { TextMid } from '../components/inputs/TextMid'
// import { TextSmall } from '../components/inputs/TextSmall'
// import { TextFull } from '../components/inputs/TextFull'
// import { TextMidPlus } from '../components/inputs/TextMidPlus'
// import { agentList, balconiesNum, community, flags, houseCondition, kitchenType, moderatorList, parking, paymentProcedure, preferedBank, propertyType, roomsNum, statementType, toiletsNum, transactionType } from '../components/dropdowns/data'
// import { NumPrice } from '../components/inputs/NumPrice'
// import baseApi from '../../../../apis/baseApi'
import { addPropertiesImgs, getPropertyData, getUploadPhoto } from '../../../../store/slices/propertySlice'
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

const AddProperties = () => {
    const dispatch = useDispatch()

    // const uploadPhoto = useSelector(getUploadPhoto)
    const { uploadPhoto } = useSelector((state) => state.property)
    const { data } = useSelector((state) => state.property)
    // console.log(data)

    useEffect(() => {
        dispatch(getPropertyData())
    }, [dispatch])

    const center = data?.slice(0, 9)
    const right = data?.slice(9, 12)

    const [addProperties, setAddProperties] = useState('')

    const addProp = (e) => {
        let { id, value, checked, files } = e.target

        setAddProperties((prev) => {
            // aranznacnel ete inj checkbox nery
            return { ...prev, [id]: checked ? checked : value ? value : files }
        })
    }
    // console.log(addProperties)//

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(addPropertiesImgs({ uploadPhoto }))
    }

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
                                    child={fields.map(({ key, title, type, option, style }) => {
                                        return (
                                            <div key={key}>
                                                {type === "select"
                                                    ? <SingleSelect
                                                        id={key}
                                                        title={title}
                                                        data={option}
                                                        style={style}
                                                        onChange={addProp}
                                                    />
                                                    : type === "text"
                                                        ? <LngPart
                                                            id={key}
                                                            title={title}
                                                            style={style}
                                                            addProp={addProp}
                                                        />
                                                        : type === "inputNumber"
                                                            ? <InputNum
                                                                id={key}
                                                                title={title}
                                                                placeholder="Ex."
                                                                style={style}
                                                                onChange={addProp}
                                                            />
                                                            : type === "inputText"
                                                                ? <InputText
                                                                    id={key}
                                                                    title={title}
                                                                    // placeholder
                                                                    style={style}
                                                                    onChange={addProp}
                                                                />
                                                                : type === "map"
                                                                    ? <YandexMap
                                                                        id={key}
                                                                        title={title}
                                                                        style={style}
                                                                        height='200px'
                                                                        onChange={addProp}
                                                                    />
                                                                    : type === 'inputNumberSymbol'
                                                                        ? <InputNumSymbol
                                                                            id={key}
                                                                            title={title}
                                                                            data={option}
                                                                            style={style}
                                                                            onChange={addProp}
                                                                        />
                                                                        : type === "checkbox"
                                                                            ? <Checkbox
                                                                                id={key}
                                                                                title={title}
                                                                                style={style}
                                                                                onChange={addProp}
                                                                            />
                                                                            : type === "numSelect"
                                                                                ? <NumSelector
                                                                                    id={key}
                                                                                    title={title}
                                                                                    data={option}
                                                                                    style={style}
                                                                                    onChange={addProp}
                                                                                // value esi idn ira arjeqo addProp anel
                                                                                />
                                                                                : type === "keyword"
                                                                                    ? <Keywords
                                                                                        id={key}
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
                                    child={fields.map(({ key, title, type, option, style }) => {
                                        return (
                                            <div key={key}>
                                                {type === "select"
                                                    ? <SingleSelect
                                                        id={key}
                                                        title={title}
                                                        data={option}
                                                        style={style}
                                                        onChange={addProp}
                                                    />
                                                    : type === "inputNumber"
                                                        ? <InputNum
                                                            id={key}
                                                            title={title}
                                                            placeholder="Ex."
                                                            style={style}
                                                            onChange={addProp}
                                                        />
                                                        : type === "inputText"
                                                            ? <InputText
                                                                id={key}
                                                                title={title}
                                                                // placeholder
                                                                style={style}
                                                                onChange={addProp}
                                                            />
                                                            : type === "addField"
                                                                ? "Ավելացնել սեփականատեր"
                                                                : type === "uploadFile"
                                                                    ? <FileUpload
                                                                        id={key}
                                                                        onChange={addProp}
                                                                    />
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


    // old,only addeds
    // const getStrInfo = async () => {
    //     try {
    //         const { data } = await baseApi.get('/api/getAddFields')
    //         setStrInfo(data)
    //     } catch (err) {
    //         console.log(`Get Structure Info: ${err.message}`);
    //     }
    // }