import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUploadPhoto } from '../../../../../store/slices/propertySlice';
import { hideImg, removeWhite, showImg, uploadImgs } from '../../../../svgs/svgs'
import './ImgsUpload.scss'

export const ImgsUpload = ({ style }) => {
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [visibleImages, setVisibleImages] = useState([])

    const dispatch = useDispatch()

    const handleImageUpload = (e) => {
        const files = Array.from(e?.target?.files)
        const uploadedImages = files.map((file) => URL.createObjectURL(file))
        setImages((prevImages) => [...prevImages, ...files])
        setPreviewImages((prevPreviews) => [...prevPreviews, ...uploadedImages])
        setVisibleImages((prevVisible) => [...prevVisible, ...Array(files.length).fill(true)])
    }

    const handleImageDelete = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages]
            updatedImages.splice(index, 1)
            return updatedImages
        });

        setPreviewImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        });

        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible]
            updatedVisible.splice(index, 1)
            return updatedVisible
        });
    }
    console.log(images, "images")

    const handleToggleVisibility = (index) => {
        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible]
            updatedVisible[index] = !updatedVisible[index]
            return updatedVisible
        });
    }

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    const handleSort = () => {
        let duplicatesPreview = [...previewImages]
        let duplicatesImages = images
        console.log(dragItem.current, "changeItem1")
        console.log(dragOverItem.current, "changeItem2")
        console.log(duplicatesImages, "test1")
        let dragOverItemTest =  duplicatesImages[dragOverItem.current];
        let dragItemTest = duplicatesImages[dragItem.current];
        duplicatesImages[dragOverItem.current] = dragItemTest;
        console.log(duplicatesImages, duplicatesImages[dragOverItem.current], 8444 )
        // duplicatesImages[dragOverItem.current] = dragOverItemTest;

        console.log(dragOverItemTest, dragItemTest ,'dsdfsd' );
        // duplicatesImages[dragOverItem.current] = duplicatesImages[dragItem.current]
        // duplicatesImages[dragItem.current] =  duplicatesImages[dragOverItem.current]

        console.log(duplicatesImages, "test2")
        // [duplicatesImages[dragItem.current], duplicatesImages[dragOverItem.current]] = [duplicatesImages[dragOverItem.current], duplicatesImages[dragItem.current] ]



        const draggedItemPreview = duplicatesPreview.splice(dragItem.current, 1)[0]
        // console.log(draggedItemPreview)
        const draggedItemImages = Object.keys(duplicatesImages).filter((e) => dragItem.current === Number(e)).reduce((cur, key) => { return Object.assign(cur, { [key]: duplicatesImages[key] }) }, {})
        // console.log(draggedItemImages)


        duplicatesPreview.splice(dragOverItem.current, 0, draggedItemPreview)
        // console.log(duplicatesPreview)
        // draggedItemImages.splice(dragOverItem.current, 0, draggedItemImages)

        dragItem.current = null
        dragOverItem.current = null

        setPreviewImages(duplicatesPreview)
        // setImages(duplicatesImages)
    }

    const updateUploadPhoto = () => {
        const formData = new FormData()
        images.forEach((image, index) => {
            formData.append(`image${index}`, image)
        });
        dispatch(setUploadPhoto(formData))//
    }

    useEffect(() => {
        updateUploadPhoto()
    }, [images])

    return (
        <div style={{ width: style }} className='imgsUpload'>
            {/* <button onClick={handleUpload}>Send</button> */}

            <div className='imgsUpload__card'>
                <label className='imgsUpload__upload'>
                    {uploadImgs.icon}
                    <input
                        type="file"
                        multiple
                        accept='image/png , image/jpeg , image/jpg , image.webp'
                        onChange={handleImageUpload} />
                </label>
                {previewImages.map((preview, index) => (
                    <div
                        key={index}
                        className='imgsUpload__card-main'
                        draggable={visibleImages[index] ? true : false}
                        onDragStart={() => dragItem.current = index}
                        onDragEnter={() => dragOverItem.current = index}
                        onDragEnd={handleSort}

                    >
                        <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className='imgsUpload__card-img'
                        />
                        {!visibleImages[index] ? <p>Թաքցված</p> : null}
                        <div className='imgsUpload__card-btns'>
                            <span
                                onClick={() => handleToggleVisibility(index)}
                                className='imgsUpload__card-btns-hideShow'
                            >
                                {visibleImages[index] ? hideImg.icon : showImg.icon}
                                {visibleImages[index] ? 'Թաքցնել' : 'Բացել'}
                            </span>
                            <span
                                onClick={() => handleImageDelete(index)}
                                className='imgsUpload__card-btns-delete'
                            >
                                {removeWhite.icon}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
