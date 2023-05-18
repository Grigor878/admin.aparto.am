import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUploadPhoto } from '../../../../../store/slices/propertySlice';
import { hideImg, removeWhite, showImg, uploadImgs } from '../../../../svgs/svgs'
import './ImgsUpload.scss'

export const ImgsUpload = ({ style }) => {
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [visibleImages, setVisibleImages] = useState([])

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

    const handleToggleVisibility = (index) => {
        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible]
            updatedVisible[index] = !updatedVisible[index]
            return updatedVisible
        })
    }

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    const handleSort = () => {
        const draggedItemIndex = dragItem.current
        const dragOverItemIndex = dragOverItem.current

        const updatedImages = [...images]
        const updatedPreviews = [...previewImages]

        const draggedImage = updatedImages[draggedItemIndex]
        const draggedPreview = updatedPreviews[draggedItemIndex]

        updatedImages.splice(draggedItemIndex, 1)
        updatedPreviews.splice(draggedItemIndex, 1)

        updatedImages.splice(dragOverItemIndex, 0, draggedImage)
        updatedPreviews.splice(dragOverItemIndex, 0, draggedPreview)

        const reorderedImages = Array.from(updatedImages)
        const reorderedPreviews = Array.from(updatedPreviews)

        setImages(reorderedImages)
        setPreviewImages(reorderedPreviews)
    }

    const dispatch = useDispatch()

    const updateUploadPhoto = () => {
        const sortedFormData = new FormData()
        images.forEach((image, index) => {
            sortedFormData.append(visibleImages[index] ? `visible-${index}` : `hidden-${index}`, image)
        });
        dispatch(setUploadPhoto(sortedFormData))
    }

    // mi masov verevy avelacrac visible,hidden
    // const updateUploadPhoto = () => {
    //     const sortedFormData = new FormData();
    //     images.forEach((image, index) => {
    //         sortedFormData.append(`image${index}`, image);
    //         sortedFormData.append(index, visibleImages[index] ? 'visible' : 'hidden');
    //     });

    //     dispatch(setUploadPhoto(sortedFormData));
    // };

    // aranzin erku mas (visible,hidden)
    // const updateUploadPhoto = () => {
    //     const sortedFormData = new FormData();
    //     images.forEach((image, index) => {
    //         if (visibleImages[index]) {
    //             sortedFormData.append(`visibleImages[${index}]`, image);
    //         } else {
    //             sortedFormData.append(`hiddenImages[${index}]`, image);
    //         }
    //     });

    //     dispatch(setUploadPhoto(sortedFormData));
    // };

    useEffect(() => {
        updateUploadPhoto()
    }, [images, visibleImages])

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
