import React, { useRef, useState } from 'react'
import { sizeData } from './data'
import useOutsideClick from '../../../../hooks/useOutsideClick'
import "./Size.scss"
// import cookies from 'js-cookie'

const Size = () => {
    const sizeRef = useRef()
    const [openSize, setOpenSize] = useState(false)
    const [selectedSize, setSelectedSize] = useState({
        id: 1,
        icon: <p className='size__unit'>m<sup>2</sup></p>
    });
    const handleOpenSize = () => {
        setOpenSize(!openSize);
    }

    const handleChangeSize = (id, icon,) => {
        setOpenSize(false)
        setSelectedSize({ id: id, icon: icon })
        // cookies.set("sizeUnit", name)
    };

    useOutsideClick(sizeRef, openSize, setOpenSize);

    return (
        <div className='size' ref={sizeRef}>
            <div
                className="size__choose"
                onClick={handleOpenSize}
            >
                {selectedSize.icon}
            </div>

            <ul className={!openSize ? "size__dropdown" : "size__dropdown-active"}>
                {sizeData.filter((el) => el.id !== selectedSize.id).map(({ id, icon }) => (
                    <li
                        key={id}
                        onClick={() => handleChangeSize(id, icon)}
                    >{icon}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Size