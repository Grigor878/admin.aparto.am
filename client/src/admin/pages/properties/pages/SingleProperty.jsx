import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../../../../components/loader/Loader'
import { balcony, buildingType, buildingYear, floor, idShevron, kitchenType, location, orentation, propertyType, square } from '../../../svgs/svgs'
import './Styles.scss'

const SingleProperty = () => {
    const { id } = useParams()
    const propertyId = Number(id)
    const { propertyData } = useSelector((state) => state.property)

    let currentProperty = propertyData?.find(item => item.id === propertyId)

    const currentPropertyData = currentProperty?.am
    console.log(currentPropertyData)//
    // const currentPropertyKeywords = currentProperty?.keywords
    // const currentPropertyFiles = currentProperty?.file
    // const currentPropertyImgs = currentProperty?.photo
    // console.log()//

    return (
        !currentProperty && !currentPropertyData
            ? <Loader />
            : <article className='singleProperty'>
                {/* <h1>SingleProperty page {id}</h1>
            <button onClick={() => navigate(-1)}>Back</button> */}
                <div className='singleProperty__imgs'>
                </div>

                <div className='singleProperty__content'>
                    <div className='singleProperty__content-left'>
                        <div className='singleProperty__content-left-title'>
                            <div className='singleProperty__content-left-title-left'>
                                <h2 className='singleProperty__title'>
                                    {currentPropertyData[0].fields[2].value}
                                </h2>
                                <p>
                                    {location.icon}
                                    {currentPropertyData[1].fields[0].value},
                                    {currentPropertyData[1].fields[0].communityStreet.value}

                                    <span onClick={() => window.scrollTo(0, document.body.scrollHeight)}>Տեսնել քարտեզի վրա</span>
                                </p>
                            </div>

                            <div className='singleProperty__content-left-title-right'>
                                <span>{idShevron.icon} {currentProperty.id}</span>
                                <p>{currentProperty.selectedTransationType === "sale" ? "Վաճառք" : "Վարձակալութուն"}</p>
                            </div>
                        </div>

                        <div className='singleProperty__content-left-options'>
                            <div>
                                {propertyType.icon}
                                Գույքի տիպ  -<p>{currentPropertyData[0].fields[1].value}</p>
                            </div>
                            <div>
                                {square.icon}
                                <p>{currentPropertyData[3].fields[0].value} մ<sup>2</sup></p>
                            </div>
                            <div>
                                {floor.icon}
                                <p>{currentPropertyData[3].fields[8].value} / {currentPropertyData[4].fields[1].value}</p>
                            </div>
                            <div>
                                {balcony.icon}
                                <p>{Number(currentPropertyData[3].fields[5].value) + Number(currentPropertyData[3].fields[6].value)}</p> պատշգամբ
                            </div>
                            <div>
                                {buildingType.icon}
                                Շինության տիպ -<p>{currentPropertyData[4].fields[0].value}</p>
                            </div>
                            <div>
                                {buildingYear.icon}
                                Կառուցված -<p>{currentPropertyData[4].fields[3].value}</p>
                            </div>
                            <div>
                                {kitchenType.icon}
                                Խոհանոցի տիպ -<p>{currentPropertyData[3].fields[11].value}</p>
                            </div>
                            <div>
                                {orentation.icon}
                                Կողմնորոշում -<p>{currentPropertyData[4].fields[4].value}</p>
                            </div>
                        </div>

                        <div className='singleProperty__content-left-desc'>
                            <h2 className='singleProperty__subtitle'>Տան Նկարագիր</h2>

                            <div className='singleProperty__content-left-desc-info'>
                                <p>Սենյակների քանակ - <span>{currentPropertyData[3].fields[2].value}</span></p>
                                <p>Ննջասենյակների քանակ - <span>{currentPropertyData[3].fields[3].value}</span></p>
                                <p>Սանհանգույցների քանակ - <span>{currentPropertyData[3].fields[4].value}</span></p>
                                <p>Փակ պատշգամբների քանակ - <span>{currentPropertyData[3].fields[6].value}</span></p>
                                <p>Բաց պատշգամբների քանակ - <span>{currentPropertyData[3].fields[5].value}</span></p>
                                <p>Առաստաղի բարձրություն - <span>{currentPropertyData[3].fields[1].value} մ</span></p>
                            </div>

                            <p className='singleProperty__content-left-desc-text'>
                            {currentPropertyData[0].fields[3].value}
                            </p>
                        </div>
                    </div>

                    <div className='singleProperty__content-right'>

                    </div>
                </div>
            </article >
    )
}

export default SingleProperty


// for scroll best performance
// if (typeof window.scrollTo === 'function') {
//     window.scrollTo(0, document.body.scrollHeight);
// } else {
//     window.scrollTo(0, document.documentElement.scrollHeight);
// }