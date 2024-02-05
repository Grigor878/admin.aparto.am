import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../../apis/config';
import noImg from "../../../../assets/imgs/noImg.png";
import { amdFormater, cutCommunity, sqmToFt2, usdFormater } from '../../../../helpers/formatters';
import { buildType, roomIcon, square } from '../../../../admin/svgs/svgs';
import './CardById.scss'

export const CardById = ({ selectedItem, closeCard }) => {
    const { t } = useTranslation()

    const { size, exchange, exchangeValue } = useSelector((state => state.home))

    const cardRef = useRef()

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                closeCard()
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [cardRef, closeCard]);

    return (
        <Link
            ref={cardRef}
            key={selectedItem?.id}
            target={"_blank"}
            to={`/result/${selectedItem?.id}`}
            className="cardResult"
        >
            <img
                src={
                    selectedItem?.photo?.length
                        ? `${API_BASE_URL}/images/${selectedItem?.photo[0]} `
                        : noImg
                }
                className="cardResult-img"
                alt="HomeImg"
            />

            <div className="cardResult-main">
                <div className="cardResult-main-top">
                    {exchange === 2
                        ? <p>&#1423;  {amdFormater(selectedItem?.price, exchangeValue)}</p>
                        : <p>{usdFormater(selectedItem?.price)}</p>
                    }
                    <span>ID {selectedItem?.home_id}</span>
                </div>

                <div className="cardResult-main-center">
                    <h5>{selectedItem?.title}</h5>
                    <div className="cardResult-main-center-geo">
                        <p>{cutCommunity(selectedItem?.street)}</p>
                        <p>{selectedItem?.community}</p>
                    </div>
                </div>

                <div className="cardResult-main-bottom">
                    <span>{roomIcon.icon} {selectedItem?.rooms} {t("room")}</span>
                    <span>{buildType.icon} {selectedItem?.buildingType}</span>
                    {size === 1
                        ? <span>{square.icon} {selectedItem?.surface} {t("square_symbol")}</span>
                        : <span>{square.icon} {sqmToFt2(selectedItem?.surface)} {t("ft_symbol")}</span>
                    }
                </div>
            </div>

            {/* <button className="cardResult-closeMap"  onClick={closeCard}>
                X
            </button> */}
        </Link>
    )
}
