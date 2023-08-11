import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../apis/config'
import noImg from '../../assets/imgs/noImg.png'
import { rooms, buildingType, square } from '../../admin/svgs/svgs'
import './PropCard.scss'

export const PropCard = ({ data }) => {
    const navigate = useNavigate()

    const { pathname } = useLocation()

    return (
        data && <div className='propCard'>
            {pathname?.includes("result")
                ? data.map(({ id, home_id, photo, am }) => {
                    return (
                        <div key={id} className='propCard__card' onClick={() => navigate(`/result/${id}`)} style={{ gap: "10px", justifyContent: "none" }}>
                            {/* <div key={id} className='propCard__card'> */}
                            <img src={photo[0]?.name ? `${API_BASE_URL}/images/${photo[0]?.name} ` : noImg} alt="HomeImg" />

                            <div className='propCard__card-main'>
                                <div className='propCard__card-main-top'>
                                    <p>$ {am[2]?.fields[0]?.value}</p>
                                    <span># {home_id}</span>
                                </div>

                                <div className='propCard__card-main-center'>
                                    <h5>{am[0]?.fields[2]?.value?.length >= 31 ? am[0]?.fields[2]?.value.substr(0, 31) + "..." : am[0]?.fields[2]?.value}</h5>
                                    <div className='propCard__card-main-center-geo'>
                                        <p>{am[1]?.fields[0]?.communityStreet?.value}</p>
                                        <p>{am[1]?.fields[0]?.value}</p>
                                    </div>
                                </div>

                                <div className='propCard__card-main-bottom'>
                                    <span>{rooms.icon} {am[3]?.fields[2]?.value}</span>
                                    <span>{buildingType.icon}{am[4]?.fields[0]?.value}</span>
                                    <span>{square.icon}{am[3]?.fields[0]?.value}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
                : data?.slice(0, 3)?.map(({ id, home_id, photo, am }) => {
                    return (
                        <div key={id} className='propCard__card' onClick={() => navigate(`/result/${id}`)}>
                            {/* <div key={id} className='propCard__card'> */}
                            <img src={photo[0]?.name ? `${API_BASE_URL}/images/${photo[0]?.name} ` : noImg} alt="HomeImg" />

                            <div className='propCard__card-main'>
                                <div className='propCard__card-main-top'>
                                    <p>$ {am[2]?.fields[0]?.value}</p>
                                    <span># {home_id}</span>
                                </div>

                                <div className='propCard__card-main-center'>
                                    <h5>{am[0]?.fields[2]?.value?.length >= 31 ? am[0]?.fields[2]?.value.substr(0, 31) + "..." : am[0]?.fields[2]?.value}</h5>
                                    <div className='propCard__card-main-center-geo'>
                                        <p>{am[1]?.fields[0]?.communityStreet?.value}</p>
                                        <p>{am[1]?.fields[0]?.value}</p>
                                    </div>
                                </div>

                                <div className='propCard__card-main-bottom'>
                                    <span>{rooms.icon} {am[3]?.fields[2]?.value}</span>
                                    <span>{buildingType.icon}{am[4]?.fields[0]?.value}</span>
                                    <span>{square.icon}{am[3]?.fields[0]?.value}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
