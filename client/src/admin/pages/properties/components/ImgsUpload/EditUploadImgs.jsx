import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../../../../../apis/config'
import { setUploadPhoto } from '../../../../../store/slices/propertySlice';
import { hideImg, removeWhite, showImg, uploadImgs } from '../../../../svgs/svgs'
import './ImgsUpload.scss'

export const EditUploadImgs = ({ style, value }) => {
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [visibleImages, setVisibleImages] = useState([])

    const [valueImages, setValueImages] = useState(value)
    const [backendValueVisible, setBackendValueVisible] = useState(value.map(image => image.visible === "true"));

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
        })

        setPreviewImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        })


        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible]
            updatedVisible.splice(index, 1)
            return updatedVisible
        })

        //
        setValueImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews]
            updatedPreviews.splice(index, 1)
            return updatedPreviews
        })

        setBackendValueVisible((prevVisible) => {
            const updatedVisible = [...prevVisible];
            updatedVisible.splice(index, 1);
            return updatedVisible;
        });
    }

    const handleToggleVisibility = (index) => {
        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible]
            updatedVisible[index] = !updatedVisible[index]
            return updatedVisible
        })

        setBackendValueVisible((prevVisible) => {
            const updatedVisible = [...prevVisible];
            updatedVisible[index] = !updatedVisible[index];
            return updatedVisible;
        });
    }

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    // const handleSort = () => {
    //     if (!visibleImages[dragItem.current]) {
    //         return;
    //     }

    //     const draggedImage = images[dragItem.current];
    //     const draggedPreview = previewImages[dragItem.current];
    //     const draggedVisible = visibleImages[dragItem.current];

    //     const updatedImages = [...images];
    //     const updatedPreviews = [...previewImages];
    //     const updatedVisible = [...visibleImages];

    //     updatedImages.splice(dragItem.current, 1);
    //     updatedPreviews.splice(dragItem.current, 1);
    //     updatedVisible.splice(dragItem.current, 1);

    //     if (dragOverItem.current === null) {
    //         updatedImages.push(draggedImage);
    //         updatedPreviews.push(draggedPreview);
    //         updatedVisible.push(draggedVisible);
    //     } else {
    //         const insertIndex = updatedVisible[dragOverItem.current] ? dragOverItem.current : dragOverItem.current + 1;

    //         updatedImages.splice(insertIndex, 0, draggedImage);
    //         updatedPreviews.splice(insertIndex, 0, draggedPreview);
    //         updatedVisible.splice(insertIndex, 0, draggedVisible);
    //     }

    //     setImages(updatedImages);
    //     setPreviewImages(updatedPreviews);
    //     setVisibleImages(updatedVisible);
    // };

    const handleSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) {
            return;
        }

        const draggedImage = images[dragItem.current];
        const draggedPreview = previewImages[dragItem.current];
        const draggedVisible = visibleImages[dragItem.current];
        const draggedBackendVisible = backendValueVisible[dragItem.current];

        const updatedImages = [...images];
        const updatedPreviews = [...previewImages];
        const updatedVisible = [...visibleImages];
        const updatedBackendValueVisible = [...backendValueVisible];

        updatedImages.splice(dragItem.current, 1);
        updatedPreviews.splice(dragItem.current, 1);
        updatedVisible.splice(dragItem.current, 1);
        updatedBackendValueVisible.splice(dragItem.current, 1);

        const insertIndex = dragOverItem.current >= updatedVisible.length ? updatedVisible.length : dragOverItem.current;

        updatedImages.splice(insertIndex, 0, draggedImage);
        updatedPreviews.splice(insertIndex, 0, draggedPreview);
        updatedVisible.splice(insertIndex, 0, draggedVisible);
        updatedBackendValueVisible.splice(insertIndex, 0, draggedBackendVisible);

        setImages(updatedImages);
        setPreviewImages(updatedPreviews);
        setVisibleImages(updatedVisible);
        setBackendValueVisible(updatedBackendValueVisible);
    }

    const dispatch = useDispatch()

    const updateUploadPhoto = () => {
        const sortedFormData = new FormData()
        images.forEach((image, index) => {
            sortedFormData.append(visibleImages[index] ? `visible-${index}` : `hidden-${index}`, image)
        })
        dispatch(setUploadPhoto(sortedFormData))
    }

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

                {/* from backend value */}
                {/* {valueImages.map((image, index) => (
                    <div
                        key={index}
                        className='imgsUpload__card-main'
                        draggable={image.visible === "true"}
                        onDragStart={(e) => {
                            if (image.visible !== "true") {
                                e.preventDefault();
                                return;
                            }
                            dragItem.current = index;
                        }}
                        onDragEnter={() => {
                            if (image.visible !== "true") {
                                return;
                            }
                            dragOverItem.current = index;
                        }}
                        onDragEnd={handleSort}
                    >
                        <img
                            src={API_BASE_URL + `/images/` + image.name}
                            alt={`Preview ${index}`}
                            className='imgsUpload__card-img'
                        />
                        {image.visible !== "true" && <p>Թաքցված</p>}
                        <div className='imgsUpload__card-btns'>
                            <button
                                type="button"
                                onClick={() => handleToggleVisibility(index)}
                                className='imgsUpload__card-btns-hideShow'
                            >
                                {image.visible === "true" ? hideImg.icon : showImg.icon}
                                {image.visible === "true" ? 'Թաքցնել' : 'Բացել'}
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
                ))} */}
                {valueImages.map((image, index) => (
                    <div
                        key={index}
                        className='imgsUpload__card-main'
                        draggable={backendValueVisible[index]}
                        onDragStart={(e) => {
                            if (!backendValueVisible[index]) {
                                e.preventDefault();
                                return;
                            }
                            dragItem.current = index;
                        }}
                        onDragEnter={() => {
                            if (!backendValueVisible[index]) {
                                return;
                            }
                            dragOverItem.current = index;
                        }}
                        onDragEnd={handleSort}
                    >
                        <img
                            src={API_BASE_URL + `/images/` + image.name}
                            alt={`Preview ${index}`}
                            className='imgsUpload__card-img'
                        />
                        {!backendValueVisible[index] && <p>Թաքցված</p>}
                        <div className='imgsUpload__card-btns'>
                            <button
                                type="button"
                                onClick={() => handleToggleVisibility(index)}
                                className='imgsUpload__card-btns-hideShow'
                            >
                                {backendValueVisible[index] ? hideImg.icon : showImg.icon}
                                {backendValueVisible[index] ? 'Թաքցնել' : 'Բացել'}
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



                {/* addeds */}
                {previewImages.map((preview, index) => (
                    <div
                        key={index}
                        className='imgsUpload__card-main'
                        // draggable={visibleImages[index] ? true : false}
                        // onDragStart={() => dragItem.current = index}
                        // onDragEnter={() => dragOverItem.current = index}
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
                            src={preview}
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

