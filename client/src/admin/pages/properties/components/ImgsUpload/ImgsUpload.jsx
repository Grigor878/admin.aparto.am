import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUploadPhoto, setUploadPhotoReserve, setUploadPhotoReserveTwo } from '../../../../../store/slices/propertySlice'
import { hideImg, removeWhite, showImg, uploadImgs } from '../../../../svgs/svgs'
import { API_BASE_URL } from '../../../../../apis/config'
import { error } from '../../../../../components/swal/swal'
import './ImgsUpload.scss'

export const ImgsUpload = ({ style, value }) => {
    const names = value?.map((item) => item.name)

    const [images, setImages] = useState(value ? names : [])
    const [previewImages, setPreviewImages] = useState(value ? value : [])
    const [visibleImages, setVisibleImages] = useState(value ? value?.map(image => image.visible === "true") : [])
    const [newUploads, setNewUploads] = useState(0)

    const handleImageUpload = (e) => {
        const files = Array.from(e?.target?.files)
        const uploadedImages = files.map((file) => URL.createObjectURL(file))

        const totalUploads = newUploads + files.length

        if (!value && totalUploads > 40) {
            return error('Ավելացնել մինչև 40 նկար։')
        } else if (value && totalUploads > 20) {
            return error('Ավելացնել մինչև 20 նկար։')
        } else if (images?.length >= 60 || files?.length + images?.length > 60) {
            return error('Ավելացված Է մաքսիմալ 60 հատ նկար։')
        }

        setImages((prevImages) => [...prevImages, ...files])
        setPreviewImages((prevPreviews) => [...prevPreviews, ...uploadedImages])
        setVisibleImages((prevVisible) => [...prevVisible, ...Array(files.length).fill(true)])
        setNewUploads((prevUploads) => prevUploads + files.length)
    }
    
    const handleImageDelete = (index) => {
        setNewUploads((prevUploads) => prevUploads - 1)

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
        if (!visibleImages[dragItem.current]) {
            return;
        }

        const draggedImage = images[dragItem.current];
        const draggedPreview = previewImages[dragItem.current];
        const draggedVisible = visibleImages[dragItem.current];

        const updatedImages = [...images];
        const updatedPreviews = [...previewImages];
        const updatedVisible = [...visibleImages];

        updatedImages.splice(dragItem.current, 1);
        updatedPreviews.splice(dragItem.current, 1);
        updatedVisible.splice(dragItem.current, 1);

        if (dragOverItem.current === null) {
            updatedImages.push(draggedImage);
            updatedPreviews.push(draggedPreview);
            updatedVisible.push(draggedVisible);
        } else {
            const insertIndex = updatedVisible[dragOverItem.current] ? dragOverItem.current : dragOverItem.current + 1;

            updatedImages.splice(insertIndex, 0, draggedImage);
            updatedPreviews.splice(insertIndex, 0, draggedPreview);
            updatedVisible.splice(insertIndex, 0, draggedVisible);
        }

        setImages(updatedImages);
        setPreviewImages(updatedPreviews);
        setVisibleImages(updatedVisible);
    }

    const dispatch = useDispatch()

    const updateUploadPhoto = () => {
        const sortedFormData = new FormData();
        const first = images.slice(0, 20)
        first.forEach((image, index) => {
            sortedFormData.append(
                visibleImages[index] ? `visible-${index}` : `hidden-${index}`,
                image
            )
        })
        const second = images.slice(20, 40)
        const reserveFormData = new FormData();
        second.forEach((image, index) => {
            reserveFormData.append(
                visibleImages[index + 20] ? `visible-${index + 20}` : `hidden-${index + 20}`,
                image
            )
        })
        const third = images.slice(40, 60)
        const reserveTwoFormData = new FormData();
        third.forEach((image, index) => {
            reserveTwoFormData.append(
                visibleImages[index + 40] ? `visible-${index + 40}` : `hidden-${index + 40}`,
                image
            )
        })

        dispatch(setUploadPhoto(sortedFormData));
        dispatch(setUploadPhotoReserve(reserveFormData));
        dispatch(setUploadPhotoReserveTwo(reserveTwoFormData));
    };


    useEffect(() => {
        updateUploadPhoto()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, visibleImages])

    return (
        <div style={{ width: style }} className='imgsUpload'>
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
                        draggable={visibleImages[index]}
                        onDragStart={(e) => {
                            if (!visibleImages[index]) {
                                e.preventDefault();
                                return;
                            }
                            dragItem.current = index;
                        }}
                        onDragEnter={() => {
                            if (!visibleImages[index]) {
                                return;
                            }
                            dragOverItem.current = index;
                        }}
                        onDragEnd={handleSort}

                    >
                        <img
                            src={!preview.name ? preview : API_BASE_URL + `/images/` + preview.name}
                            loading='lazy'
                            alt={`Preview ${index}`}
                            className='imgsUpload__card-img'
                        />
                        {!visibleImages[index] ? <p>Թաքցված</p> : null}
                        <div className='imgsUpload__card-btns'>
                            <button
                                type="button"
                                onClick={() => handleToggleVisibility(index)}
                                className='imgsUpload__card-btns-hideShow'
                            >
                                {visibleImages[index] ? hideImg.icon : showImg.icon}
                                {visibleImages[index] ? 'Թաքցնել' : 'Բացել'}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleImageDelete(index)}
                                className='imgsUpload__card-btns-delete'
                            >
                                {removeWhite.icon}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
