import React from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL, APP_BASE_URL } from '../../../../../../apis/config'
import noImg from '../../../../../../assets/imgs/noImg.png'
import { Type } from './Type'
import { usdFormater } from '../../../../../../helpers/formatters'
import { bathroomsIcon, floorIcon, heightIcon, roomIcon, square, top, url } from '../../../../../svgs/svgs'
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

    const { userGlobal } = useSelector((state => state.userGlobal))

    return (
        data?.map(({ id, home_id, photo, selectedTransactionType, announcementType, title, community, street, building, entrance, floor, statement, apartment, price, room, bathrooms, surface, height, otherFacility, agent, owner, ownerTel, updated_at, created_at, status }) => {
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
                        {photo
                            ? <img src={`${API_BASE_URL}/images/${photo}`} alt="propertyImg" loading='lazy' />
                            : <img src={noImg} alt="No Img" loading='lazy' />
                        }

                        <div className='propertyList__item-view-types'>
                            <span>{selectedTransactionType === "sale" ? "Վաճառք" : "Վարձակալություն"}</span>
                            <Type data={announcementType} />
                        </div>
                    </Link>

                    <div className='propertyList__item-right'>
                        <div className="propertyList__item-right-main">
                            <h6>{title}</h6>

                            <div className="propertyList__item-right-main-address">
                                <p>{community}</p>
                                <h4>{street} {building}</h4>
                                <span>
                                    {entrance && `մուտք ${entrance}, `}
                                    {floor && `հարկ ${floor}, `}
                                    {apartment && `բնակարան ${apartment}`}
                                </span>
                            </div>

                            <div className='propertyList__item-right-main-global'>
                                <p>{"# "}{home_id}</p>
                                {price !== "" || price === "0"
                                    ? <p>{usdFormater(price)}</p>
                                    : <p>Պայմանագրային</p>}
                            </div>
                        </div>

                        <div className='propertyList__item-right-characters'>
                            {room && (
                                <p>{roomIcon.icon} {room} սենյակ</p>
                            )}
                            {bathrooms && (
                                <p>{bathroomsIcon.icon}{bathrooms} սանհանգույց</p>
                            )}
                            {surface && surface !== 0 && (
                                <p>{square.icon}{surface} ք.մ</p>
                            )}
                            {statement && floor && statement !== 0 && (
                                <p>{floorIcon.icon}{floor}/{statement} հարկ</p>
                            )}
                            {height && height !== 0 && (
                                <p>{heightIcon.icon}{height} մ</p>
                            )}

                        </div>

                        <div className='propertyList__item-right-facality'>
                            {otherFacility
                                // ?.filter(el => el.value === true)
                                // ?.slice(0, 5)
                                ?.map((el) => {
                                    return (
                                        // <p key={key}>{title}</p>
                                        <p key={el}>{el}</p>
                                    )
                                })}
                        </div>

                        <div className='propertyList__item-right-info'>
                            {userGlobal?.role === "agent" && userGlobal?.full_name?.am === agent ?
                                <div className='propertyList__item-right-info-owner'>
                                    <p>{owner}</p>
                                    <p>{ownerTel}</p>
                                </div>
                                : userGlobal?.role !== "agent" ?
                                    <div className='propertyList__item-right-info-owner'>
                                        <p>{owner}</p>
                                        <p>{ownerTel}</p>
                                    </div>
                                    : null
                            }

                            <div className='propertyList__item-right-info-agent'>
                                <p>{agent}</p>
                                <p>{updated_at} - {created_at}</p>
                            </div>

                            <div className='propertyList__item-right-info-btns'>
                                {status === "approved"
                                    ? <div className='propertyList__item-right-info-btns-approved'>
                                        <Btn
                                            status="approved"
                                            text="Ակտիվ"
                                        />
                                        {userGlobal?.role === "agent" && userGlobal?.full_name.am === agent
                                            ? <button
                                                type='button'
                                                onClick={() => dispatch(updateHome(id))}
                                            >
                                                {top.icon}
                                            </button>
                                            : userGlobal?.role !== "agent" ?
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

                        <More id={id} status={status} agentName={agent} />
                    </div>
                </div>
            )
        })
    )
}