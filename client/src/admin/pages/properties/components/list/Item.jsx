import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL, APP_BASE_URL } from '../../../../../apis/config'
import { moneyFormater } from '../../../../../helpers/formatters'
import { bathrooms, floor, height, more, rooms, square, top, url } from '../../../../svgs/svgs'
import { Btn } from './Btn'
import './Styles.scss'

export const Item = ({ data }) => {
    // console.log(data)//
    let navigate = useNavigate()

    const [active, setActive] = useState(false)

    return (
        data?.map(({ id, photo, selectedTransationType, am, updatedAt, createdAt, status }) => {
            return (
                <div
                    key={id}
                    className="propertyList__item"
                >
                    <div
                        className='propertyList__item-view'
                        onClick={() => navigate(`${id}`)}
                    >
                        {photo.length !== 0 && <img src={`${API_BASE_URL}/images/${photo[0].name}`} alt="propertyImg" loading='lazy' />}

                        <div className='propertyList__item-view-types'>
                            <span>{selectedTransationType === "sale" ? "Վաճառք" : "Վարձակալութուն"}</span>
                            <span>{am[0].fields[4].value}</span>
                        </div>
                    </div>

                    <div className='propertyList__item-right'>
                        <div className="propertyList__item-right-main">
                            <h6>{am[0].fields[2].value}</h6>

                            <div className="propertyList__item-right-main-address">
                                <p>{am[1].fields[0].value}</p>
                                <h4>{am[1].fields[0].communityStreet.value} {am[1].fields[1]?.value},</h4>
                                <span>
                                    մուտք {am[1].fields[2]?.value},
                                    հարկ {am[3].fields[8].value},
                                    բնակարան {am[1].fields[3]?.value}
                                </span>
                            </div>

                            <div className='propertyList__item-right-main-global'>
                                <p>{"# "}{id}</p>
                                <p>{moneyFormater(am[2].fields[0].value)}</p>
                            </div>
                        </div>

                        <div className='propertyList__item-right-characters'>
                            <p>{rooms.icon} {am[3].fields[2].value} սենյակ</p>
                            <p>{bathrooms.icon}{am[3].fields[4].value} սանհանգույց</p>
                            <p>{square.icon}{am[3].fields[0].value} ք.մ</p>
                            <p>{floor.icon}{am[3].fields[8].value}/{am[4].fields[1].value} հարկ</p>
                            <p>{height.icon}{am[3].fields[1].value} մ</p>
                        </div>

                        <div className='propertyList__item-right-facality'>
                            {am[6]?.fields
                                ?.filter(el => el.value === true)
                                ?.slice(0, 5)
                                ?.map(({ key, title }) => {
                                    return (
                                        <p key={key}>{title}</p>
                                    )
                                })}
                        </div>

                        <div className='propertyList__item-right-info'>
                            <div className='propertyList__item-right-info-owner'>
                                <p>{am[9].fields[0].value}</p>
                                <p>{am[9].fields[1].value}</p>
                            </div>

                            <div className='propertyList__item-right-info-agent'>
                                <p>{am[11].fields[0].value}</p>
                                <p>{updatedAt} - {createdAt}</p>
                            </div>

                            <div className='propertyList__item-right-info-btns'>
                                {status === "approved"
                                    ? <div className='propertyList__item-right-info-btns-approved'>
                                        <Btn
                                            status="approved"
                                            text="Ակտիվ"
                                        />
                                        <button
                                            type='button'
                                            onClick={() => alert("top")}
                                        >
                                            {top.icon}
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => alert(`${APP_BASE_URL}/${selectedTransationType}/${id}`)}
                                        >
                                            {url.icon}
                                        </button>
                                    </div>
                                    : status === "moderation"
                                        ? <Btn
                                            status="moderation"
                                            text="Վերանայման"
                                        />
                                        : <Btn
                                            status="deactive"
                                            text="Ապաակտիվացված"
                                        />
                                }
                            </div>
                        </div>

                        <div className='propertyList__item-right-more'>
                            <div
                                className='propertyList__item-right-more-icon'
                                onClick={() => !active ? setActive(true) : setActive(false)}
                            >
                                {more.icon}
                            </div>

                            <div className={!active ? 'propertyList__item-right-more-menuClose' : 'propertyList__item-right-more-menu'}>
                                <Link
                                    className='propertyList__item-right-more-menu-link'
                                    to={`edit/${id}`}
                                >
                                    Փոփոխել
                                </Link>
                                {status === "approved"
                                    ? <button
                                        className='propertyList__item-right-more-menu-item'
                                        onClick={() => alert("Cooming Soon :)")}
                                    >
                                        Ապաակտիվացնել
                                    </button>
                                    : status === "deactive"
                                        ? <button
                                            className='propertyList__item-right-more-menu-item'
                                            onClick={() => alert("Cooming Soon :)")}
                                        >
                                            Ակտիվացնել
                                        </button>
                                        : null
                                }
                                <button
                                    style={{ color: "#D34545" }}
                                    className='propertyList__item-right-more-menu-item'
                                    onClick={() => alert("Cooming Soon :)")}
                                >
                                    Արխիվացնել
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

// {/* <div className='propertyList__slide'>
//                 <p>ID - {id}</p>
//                 <p>Type - {selectedTransationType}</p>
//             </div>
//             <div className='propertyList__info'>
//                 <Link to={`edit/${id}`}> Edit Page</Link>
//             </div> */}