import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editPropertyData, editSinglePropertyData } from '../../../../store/slices/propertySlice'
import { Loader } from '../../../../components/loader/Loader'
import AddPart from '../../../components/addPart/AddPart'
import { Card } from '../components/card/Card'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import { EditableSelect } from '../components/dropdowns/EditableSelect'
import { InputNum } from '../components/inputs/InputNum'
import { InputNumSymbol } from '../components/inputs/InputNumSymbol'
import { CommunitySelect } from '../components/asyncSelects/CommunitySelect'
import { LngPartEdit } from '../components/lngPart/LngPartEdit'
import { LngPartSmall } from '../components/lngPart/LngPartSmall'
import { InputText } from '../components/inputs/InputText'
import { YandexMap } from '../components/yandexMap/YandexMap'
import { AgentSelect } from '../components/asyncSelects/AgentSelect'
import { ManagerSelect } from '../components/asyncSelects/ManagerSelect'
import { EditOwner } from '../components/owner/EditOwner'
import { Keywords } from '../components/keywords/Keywords'
import { FileUpload } from '../components/inputs/FileUpload'
import { ImgsUpload } from '../components/imgsUpload/ImgsUpload'
import { InputNumSingle } from '../components/inputs/InputNumSingle'
import { Checkbox } from '../../../components/checkboxes/Checkbox'
import { NumSelector } from '../components/inputs/NumSelector'
import './Styles.scss'
import { error } from '../../../../components/swal/swal'

const EditProperties = () => {
    const { id } = useParams()
    const propertyId = Number(id)

    const dispatch = useDispatch()

    const { editSingleData } = useSelector((state) => state.property)

    useEffect(() => {
        dispatch(editSinglePropertyData(id))
    }, [dispatch, id])

    const currentPropertyData = editSingleData?.am
    const currentPropertyKeywords = editSingleData?.keywords
    const currentPropertyFiles = editSingleData?.file
    const currentPropertyImgs = editSingleData?.photo

    const center = currentPropertyData?.slice(0, 9)
    const right = currentPropertyData?.slice(9, 12)

    const [loading, setLoading] = useState(false)
    const [editProperty, setEditProperty] = useState('')

    const handleStreetChange = (value) => {
        setEditProperty((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                street: Number(value)
            }
        }))
    }

    const editProp = (e, name, type) => {
        const { id, value, checked } = e.target

        setEditProperty((prev) => {
            let obj = {}

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
                }
            } else {
                obj = {
                    [name]: {
                        ...prev[name],
                        [id]: checked ? checked : value,
                    },
                }
            }

            return { ...prev, ...obj }
        })
    }

    //
    const payment = editSingleData?.am[2]?.fields[4]?.value || editProperty?.price?.paymentMethod
    const numberOfRooms = editSingleData?.am[3]?.fields[2]?.value || editProperty?.houseDescription?.numberOfRooms 
    const numberOfBedrooms = editSingleData?.am[3]?.fields[3]?.value || editProperty?.houseDescription?.numberOfBedrooms
    const numberOfBathrooms = editSingleData?.am[3]?.fields[4]?.value || editProperty?.houseDescription?.numberOfBathrooms
    //
    const commercialCheck = editSingleData?.am[0].fields[1].value?.includes("Կոմերցիոն") || editProperty?.announcement?.propertyType?.includes("commercial")

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        if (!payment || !payment?.length) {
            error('Ընտրեք վճարման կարգը!')
            setLoading(false)
        } else if (!commercialCheck && !numberOfRooms) {
            error('Ընտրեք սենյակների քանակը!')
            setLoading(false)
        } else if (!commercialCheck && !numberOfBedrooms) {
            error('Ընտրեք ննջասենյակների քանակը!')
            setLoading(false)
        } else if (!numberOfBathrooms) {
            error('Ընտրեք սանհանգույցների քանակը!')
            setLoading(false)
        } else {
            dispatch(editPropertyData({ editProperty, propertyId }))
        }
    }

    return (
        loading
            ? <Loader />
            : <article className='editproperties'>
                <AddPart type="editProperties" />

                {!currentPropertyData
                    ? <Loader />
                    : <form
                        id="editPropertiesForm"
                        className='addproperties__main'
                        onSubmit={handleSubmit}
                    >
                        {/* Center part */}
                        <div className='addproperties__center'>
                            {center?.map(({ name, title, fields, added }) => {
                                return (
                                    <Card
                                        key={name}
                                        title={title}
                                        width="680px"
                                        child={fields.map(({ key, title, type, option, value, communityId, communityStreet, allAnswers, style, required, height, placeholder }) => {
                                            return (
                                                <div key={key}>
                                                    {type === "select"
                                                        ? <SingleSelect
                                                            id={key}
                                                            title={title}
                                                            data={option}
                                                            value={value}
                                                            style={style}
                                                            required={required}
                                                            onChange={(e) => editProp(e, name)}
                                                        />
                                                        : type === "multiselect"
                                                            ? <EditableSelect
                                                                id={key}
                                                                title={title}
                                                                name={name}
                                                                data={option}
                                                                value={value}
                                                                style={style}
                                                                required={required}
                                                                onChange={(e) => editProp(e, name)}
                                                            />
                                                            : type === "text"
                                                                ? <LngPartEdit
                                                                    id={key}
                                                                    title={title}
                                                                    value={allAnswers}
                                                                    style={style}
                                                                    required={required}
                                                                    onChange={(e) => editProp(e, name, type)}
                                                                />
                                                                : type === "communitySelect"
                                                                    ? <CommunitySelect
                                                                        id={key}
                                                                        title={title}
                                                                        data={option}
                                                                        defValue={value}
                                                                        valueId={communityId}
                                                                        streetData={communityStreet}
                                                                        style={style}
                                                                        required={required}
                                                                        onChange={(e) => editProp(e, name, type)}
                                                                        onStreetChange={(value) => handleStreetChange(value)}
                                                                    />
                                                                    : type === "inputNumber"
                                                                        ? <InputNum
                                                                            id={key}
                                                                            title={title}
                                                                            value={value}
                                                                            placeholder="Ex."
                                                                            style={style}
                                                                            required={required}
                                                                            onChange={(e) => editProp(e, name)}
                                                                        />
                                                                        : type === "inputText"
                                                                            ? <InputText
                                                                                id={key}
                                                                                title={title}
                                                                                value={value}
                                                                                placeholder={placeholder}
                                                                                style={style}
                                                                                required={required}
                                                                                onChange={(e) => editProp(e, name)}
                                                                            />
                                                                            : type === "map"
                                                                                ? <YandexMap
                                                                                    title={title}
                                                                                    defValue={value}
                                                                                    style={style}
                                                                                    height='200px'
                                                                                />
                                                                                : type === 'inputNumberSingle'
                                                                                    ? <InputNumSingle
                                                                                        id={key}
                                                                                        title={title}
                                                                                        placeholder={placeholder}
                                                                                        style={style}
                                                                                        required={required}
                                                                                        value={value}
                                                                                        onChange={(e) => editProp(e, name)}
                                                                                    />
                                                                                    : type === 'inputNumberSymbol'
                                                                                        ? <InputNumSymbol
                                                                                            id={key}
                                                                                            title={title}
                                                                                            data={option}
                                                                                            value={value}
                                                                                            style={style}
                                                                                            required={required}
                                                                                            onChange={(e) => editProp(e, name, type)}
                                                                                        />
                                                                                        : type === "checkbox"
                                                                                            ? <Checkbox
                                                                                                id={key}
                                                                                                title={title}
                                                                                                style={style}
                                                                                                value={value}
                                                                                                onChange={(e) => editProp(e, name)}
                                                                                            />
                                                                                            : type === "imgsUpload"
                                                                                                ? <ImgsUpload
                                                                                                    value={currentPropertyImgs}
                                                                                                    style={style} />

                                                                                                : type === "numSelect"
                                                                                                    ? <NumSelector
                                                                                                        id={key}
                                                                                                        title={title}
                                                                                                        data={option}
                                                                                                        style={style}
                                                                                                        value={value}
                                                                                                        required={required}
                                                                                                        onChange={(e) => editProp(e, name)}
                                                                                                    />
                                                                                                    : type === "keyword"
                                                                                                        ? <Keywords
                                                                                                            title={title}
                                                                                                            style={style}
                                                                                                            value={currentPropertyKeywords}
                                                                                                        />
                                                                                                        : null
                                                    }
                                                </div>
                                            )
                                        })}
                                        addedChild={added.map(({ key, style, title, type }) => {
                                            return (
                                                <LngPartEdit
                                                    key={key}
                                                    id={key}
                                                    title={title}
                                                    style={style}
                                                    onChange={(e) => editProp(e, name, type)}
                                                />
                                            )
                                        })}
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
                                        child={fields.map(({ id, key, title, type, option, value, style, required, height, placeholder }) => {
                                            return (
                                                <div key={key}>
                                                    {type === "select"
                                                        ? <SingleSelect
                                                            id={key}
                                                            title={title}
                                                            data={option}
                                                            value={value}
                                                            style={style}
                                                            required={required}
                                                            onChange={(e) => editProp(e, name)}
                                                        />
                                                        : type === "inputNumber"
                                                            ? <InputNum
                                                                id={key}
                                                                title={title}
                                                                value={value}
                                                                placeholder="Ex."
                                                                style={style}
                                                                required={required}
                                                                onChange={(e) => editProp(e, name)}
                                                            />
                                                            : type === "inputText"
                                                                ? <InputText
                                                                    id={key}
                                                                    title={title}
                                                                    value={value}
                                                                    placeholder={placeholder}
                                                                    height={height}
                                                                    style={style}
                                                                    required={required}
                                                                    onChange={(e) => editProp(e, name)}
                                                                />
                                                                : type === "addField"
                                                                    ? <EditOwner
                                                                        data={option}
                                                                        onChange={(e) => editProp(e, name)}
                                                                    />
                                                                    : type === "uploadFile"
                                                                        ? <FileUpload
                                                                            value={currentPropertyFiles}
                                                                        />
                                                                        : type === "agentSelect"
                                                                            ? <AgentSelect
                                                                                id={key}
                                                                                title={title}
                                                                                value={id}//
                                                                                style={style}
                                                                                required={required}
                                                                                onChange={(e) => editProp(e, name)}
                                                                            />
                                                                            : type === "managerSelect"
                                                                                ? <ManagerSelect
                                                                                    id={key}
                                                                                    title={title}
                                                                                    value={id}//
                                                                                    style={style}
                                                                                    required={required}
                                                                                    onChange={(e) => editProp(e, name)}
                                                                                />
                                                                                : null
                                                    }
                                                </div>
                                            )
                                        })}
                                        addedChild={added.map(({ key, title, type }) => {
                                            return (
                                                <div key={key} style={{ width: "100%" }}>
                                                    <LngPartSmall
                                                        id={key}
                                                        title={title}
                                                        onChange={(e) => editProp(e, name, type)}
                                                    />
                                                </div>
                                            )
                                        })}
                                    />
                                )
                            })}
                        </div>
                    </form>
                }
            </article>
    )
}

export default EditProperties