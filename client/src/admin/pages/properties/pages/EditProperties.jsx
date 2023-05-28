import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddPart from '../../../components/addPart/AddPart'
import { Loader } from '../../../../components/loader/Loader'
import { Card } from '../components/card/Card'
import { SingleSelect } from '../components/dropdowns/SingleSelect'
import { InputNum } from '../components/inputs/InputNum'
import { InputNumSymbol } from '../components/inputs/InputNumSymbol'
import './Styles.scss'

const EditProperties = () => {
    // const navigate = useNavigate()
    const params = useParams()
    const propertyId = Number(params.id)

    const { propertyData } = useSelector((state) => state.property)

    let currentProperty = propertyData?.find(item => item.id === propertyId)
    const currentPropertyData = currentProperty?.am
    console.log(currentPropertyData)
    const center = currentPropertyData?.slice(0, 9)
    const right = currentPropertyData?.slice(9, 12)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('clicked')
    }

    return (
        <article className='editproperties'>
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
                                    width="679px"
                                    child={fields.map(({ key, title, type, option, value, style, required, height, placeholder }) => {
                                        return (
                                            <div key={key}>
                                                {
                                                    type === "select"
                                                        ? <SingleSelect
                                                            id={key}
                                                            title={title}
                                                            data={option}
                                                            // value={value}
                                                            style={style}
                                                            required={required}
                                                        // onChange={(e) => addProp(e, name)}
                                                        />
                                                        : type === "inputNumber"
                                                            ? <InputNum
                                                                id={key}
                                                                title={title}
                                                                value={value}
                                                                placeholder="Ex."
                                                                style={style}
                                                                required={required}
                                                            // onChange={(e) => addProp(e, name)}
                                                            /> : type === 'inputNumberSymbol'
                                                                ? <InputNumSymbol
                                                                    id={key}
                                                                    title={title}
                                                                    data={option}
                                                                    value={value}
                                                                    style={style}
                                                                    required={required}
                                                                // onChange={(e) => addProp(e, name, type, key)}
                                                                />
                                                                : null
                                                }
                                            </div>
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