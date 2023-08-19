import React from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL, APP_BASE_URL } from '../../../../../../apis/config'
import noImg from '../../../../../../assets/imgs/noImg.png'
import { Type } from './Type'
import { moneyFormater } from '../../../../../../helpers/formatters'
import { bathrooms, floor, height, room, square, top, url } from '../../../../../svgs/svgs'
import { Btn } from './Btn'
import { More } from './More'
import { success } from '../../../../../../components/swal/swal'
import { useDispatch, useSelector } from 'react-redux'
import { updateHome } from '../../../../../../store/slices/propertySlice'
import '../Styles.scss'

export const Item = ({ data }) => {
    const dispatch = useDispatch()

    const copyToClipboard = async (id) => {
        const clipboard = `${APP_BASE_URL}/result/${id}`

        await navigator.clipboard.writeText(clipboard)
        success("Հասցեն պատճենված է։")
    }

    const { full_name, role } = useSelector((state => state.userGlobal.userGlobal))

    return (
        data?.map(({ id, home_id, photo, selectedTranscationType, am, updatedAt, createdAt, status }) => {
            return (
                <div
                    key={id}
                    className="propertyList__item"
                >
                    <Link
                        to={`${id}`}
                        target={"_blank"}
                        className='propertyList__item-view'
                    >
                        {photo.length !== 0
                            ? <img src={`${API_BASE_URL}/images/${photo[0].name}`} alt="propertyImg" loading='lazy' />
                            : <img src={noImg} alt="No Img" loading='lazy' />
                        }

                        <div className='propertyList__item-view-types'>
                            <span>{selectedTranscationType === "sale" ? "Վաճառք" : "Վարձակալություն"}</span>
                            <Type data={am[0].fields[4].value} />
                        </div>
                    </Link>

                    <div className='propertyList__item-right'>
                        <div className="propertyList__item-right-main">
                            <h6>{am[0].fields[2].value}</h6>

                            <div className="propertyList__item-right-main-address">
                                <p>{am[1].fields[0].value}</p>
                                <h4>{am[1].fields[0].communityStreet.value} {am[1].fields[1]?.value}</h4>
                                <span>
                                    {am[1].fields[2]?.value && `մուտք ${am[1].fields[2].value}, `}
                                    {am[3].fields[8].value && `հարկ ${am[3].fields[8].value}, `}
                                    {am[1].fields[3]?.value && `բնակարան ${am[1].fields[3].value}`}
                                </span>
                            </div>

                            <div className='propertyList__item-right-main-global'>
                                <p>{"# "}{home_id}</p>
                                <p>{moneyFormater(am[2].fields[0].value)}</p>
                            </div>
                        </div>

                        <div className='propertyList__item-right-characters'>
                            {am[3].fields[2].value && am[3].fields[2].value !== 0 && (
                                <p>{room.icon} {am[3].fields[2].value} սենյակ</p>
                            )}
                            {am[3].fields[4].value && am[3].fields[4].value !== 0 && (
                                <p>{bathrooms.icon}{am[3].fields[4].value} սանհանգույց</p>
                            )}
                            {am[3].fields[0].value && am[3].fields[0].value !== 0 && (
                                <p>{square.icon}{am[3].fields[0].value} ք.մ</p>
                            )}
                            {am[3].fields[8].value && am[4].fields[1].value && am[3].fields[8].value !== 0 && (
                                <p>{floor.icon}{am[3].fields[8].value}/{am[4].fields[1].value} հարկ</p>
                            )}
                            {am[3].fields[1].value && am[3].fields[1].value !== 0 && (
                                <p>{height.icon}{am[3].fields[1].value} մ</p>
                            )}

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
                            {role === "agent" && full_name?.am === am[11]?.fields[0]?.value ?
                                <div className='propertyList__item-right-info-owner'>
                                    <p>{am[9].fields[0].value}</p>
                                    <p>{am[9].fields[1].value}</p>
                                </div>
                                : role !== "agent" ?
                                    <div className='propertyList__item-right-info-owner'>
                                        <p>{am[9].fields[0].value}</p>
                                        <p>{am[9].fields[1].value}</p>
                                    </div>
                                    : null
                            }

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
                                        {role === "agent" && full_name.am === am[11]?.fields[0]?.value
                                            ? <button
                                                type='button'
                                                onClick={() => dispatch(updateHome(id))}
                                            >
                                                {top.icon}
                                            </button>
                                            : role !== "agent" ?
                                                <button
                                                    type='button'
                                                    onClick={() => dispatch(updateHome(id))}
                                                >
                                                    {top.icon}
                                                </button>
                                                : null
                                        }
                                        <button
                                            type='button'
                                            onClick={() => copyToClipboard(id)}
                                        >
                                            {url.icon}
                                        </button>
                                    </div>
                                    : status === "moderation"
                                        ? <Btn
                                            status="moderation"
                                            text="Վերանայման"
                                        />
                                        : status === "archived"
                                            ? <Btn
                                                status="archived"
                                                text="Արխիվացված"
                                            />
                                            : <Btn
                                                status="inactive"
                                                text="Ապաակտիվացված"
                                            />
                                }
                            </div>
                        </div>

                        <More id={id} status={status} agentName={am[11]?.fields[0]?.value} />
                    </div>
                </div>
            )
        })
    )
}