import React from 'react'
import noImg from '../../assets/imgs/noImg.png'
import './PropCard.scss'

export const PropCard = ({ data }) => {
    console.log(data)//

    return (
        <div className='propCard'>
            {data?.map(({ id, home_id, photo }) => {
                return (
                    <div key={id} className='propCard__card'>
                        <img src={noImg} alt="HomeImg" />

                        <div className='propCard__card-main'>
                            <div className='propCard__card-main-top'>
                                <p>Price</p>
                                <span>ID {home_id}</span>
                            </div>

                            <div className='propCard__card-main-center'>
                                <h5>Price</h5>
                                <div className='propCard__card-main-center-geo'>
                                    <p>Hamaynq</p>
                                    <p>Poxoc</p>
                                </div>
                            </div>

                            <div className='propCard__card-main-bottom'>
                                <span>icon + text</span>
                                <span>icon + text</span>
                                <span>icon + text</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
