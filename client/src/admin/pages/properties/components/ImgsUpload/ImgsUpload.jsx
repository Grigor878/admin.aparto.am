import React, { useRef, useState } from 'react'
import { hideImg, removeWhite, showImg, uploadImgs } from '../../../../svgs/svgs'
import './ImgsUpload.scss'
// import baseApi from '../../../../../apis/baseApi';

export const ImgsUpload = ({ style }) => {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [visibleImages, setVisibleImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const uploadedImages = files.map((file) => URL.createObjectURL(file));

        setImages((prevImages) => [...prevImages, ...files]);
        setPreviewImages((prevPreviews) => [...prevPreviews, ...uploadedImages]);
        setVisibleImages((prevVisible) => [...prevVisible, ...Array(files.length).fill(true)]);
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });

        setPreviewImages((prevPreviews) => {
            const updatedPreviews = [...prevPreviews];
            updatedPreviews.splice(index, 1);
            return updatedPreviews;
        });

        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible];
            updatedVisible.splice(index, 1);
            return updatedVisible;
        });
    };

    const handleToggleVisibility = (index) => {
        setVisibleImages((prevVisible) => {
            const updatedVisible = [...prevVisible];
            updatedVisible[index] = !updatedVisible[index];
            return updatedVisible;
        });
    };

    const handleUpload = () => {
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });
        // baseApi.post('api/multyPhoto', formData);
    };

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    const handleSort = () => {
        let duplicates = [...previewImages]

        const draggedItemContent = duplicates.splice(dragItem.current, 1)[0]

        duplicates.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null

        setPreviewImages(duplicates)
    }

    return (
        <div style={{ width: style }} className='imgsUpload'>
            <button onClick={handleUpload}>Send</button>

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
                            <button
                                onClick={() => handleToggleVisibility(index)}
                                className='imgsUpload__card-btns-hideShow'
                            >
                                {visibleImages[index] ? hideImg.icon : showImg.icon}
                                {visibleImages[index] ? 'Թաքցնել' : 'Բացել'}
                            </button>
                            <button
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
