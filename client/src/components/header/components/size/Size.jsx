import React, { useEffect, useRef, useState } from 'react'
import { sizeData } from './data'
// import cookies from 'js-cookie'
import "./Size.scss"

const Size = () => {
    const sizeRef = useRef()
    const [openSize, setOpenSize] = useState(false)
    const [selectedLng, setSelectedLng] = useState( <p className='size__unit'>m<sup>2</sup></p>)

    const handleOpenSize = () => {
        setOpenSize(!openSize);
    }

    const handleChangeLang = (name) => {
        setOpenSize(false)
        setSelectedLng(name)
        // cookies.set("sizeUnit", name)
    };

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (openSize && sizeRef.current && !sizeRef.current.contains(e.target)) {
                setOpenSize(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [openSize])


    return (
        <div className='size' ref={sizeRef}>
            <div
                className="size__choose"
                onClick={handleOpenSize}
            >
                {selectedLng}
            </div>

            <ul className={!openSize ? "size__dropdown" : "size__dropdown-active"}>
                {sizeData.map(({ id, name }) => (
                    <li
                        key={id}
                        onClick={() => handleChangeLang(name)}
                    >{name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Size