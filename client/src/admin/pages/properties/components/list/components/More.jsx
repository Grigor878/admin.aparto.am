import React, { useState } from 'react'
import { more } from '../../../../../svgs/svgs'
import { Link } from 'react-router-dom'
import { Modal } from '../../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { activateHome, archiveHome } from '../../../../../../store/slices/propertySlice'
import '../Styles.scss'

export const More = ({ id, status }) => {
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

    open
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto")

    const dispatch = useDispatch();

    const { role } = useSelector((state => state.userGlobal.userGlobal))

    return (
        <div className='propertyList__item-right-more'>
            <div
                className='propertyList__item-right-more-icon'
                onClick={() => !active ? setActive(true) : setActive(false)}
            >
                {more.icon}
            </div>

            <div className={!active ? 'propertyList__item-right-more-menuClose' : 'propertyList__item-right-more-menu'}>
                {status !== "archived" ?
                    <Link
                        className='propertyList__item-right-more-menu-link'
                        to={`edit/${id}`}
                    >
                        Փոփոխել
                    </Link>
                    : null
                }
                {status === "approved" && role !== "agent"
                    ? <button
                        className='propertyList__item-right-more-menu-item'
                        onClick={() => setOpen(true)}
                    >
                        Ապաակտիվացնել
                    </button>
                    : (status === "inactive" || status === "moderation") && role !== "agent"
                        ? <button
                            className='propertyList__item-right-more-menu-item'
                            onClick={() => dispatch(activateHome(id))}
                        >
                            Ակտիվացնել
                        </button>
                        : null
                }
                {status === "archived" && role !== "agent"
                    ? <button
                        style={{ color: "#D34545" }}
                        className='propertyList__item-right-more-menu-item'
                        onClick={() => dispatch(activateHome(id))}
                    >
                        Ապաարխիվացնել
                    </button>
                    : <button
                        style={{ color: "#D34545" }}
                        className='propertyList__item-right-more-menu-item'
                        onClick={() => dispatch(archiveHome(id))}
                    >
                        Արխիվացնել
                    </button>
                }
                <Modal
                    id={id}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </div>
    )
}
