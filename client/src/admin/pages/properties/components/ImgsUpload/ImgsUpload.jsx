import React, { useState } from 'react'
import { hideImg, removeWhite, showImg, uploadImgs } from '../../../../svgs/svgs'
import './ImgsUpload.scss'

export const ImgsUpload = ({ id, style }) => {
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
        console.log(formData)
        // axios.post('/your-backend-endpoint', formData);
    };

    return (
        <div style={{ width: style }} className='imgsUpload'>
            <button onClick={handleUpload}>Sxmi log klni</button>

            <div className='imgsUpload__card'>
                <label className='imgsUpload__upload'>
                    {uploadImgs.icon}
                    <input type="file" multiple onChange={handleImageUpload} />
                </label>
                {previewImages.map((preview, index) => (
                    <div key={index} className='imgsUpload__card-main'>
                        <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className='imgsUpload__card-img'
                            style={{ boxShadow: visibleImages[index] ? 'none' : '0 0 10px rgba(0, 0, 0, 0.5)', }}
                        />

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



// import React, { useEffect, useState } from 'react'

// export const ImgsUpload = () => {
//     const [images, setImages] = useState([]);
//     const [previewImages, setPreviewImages] = useState([]);
//     const [visibleImages, setVisibleImages] = useState([]);

//     useEffect(() => {
//         const dragOverHandler = (e) => {
//             e.preventDefault();
//         };

//         const dragEnterHandler = (e) => {
//             e.preventDefault();
//         };

//         const dragLeaveHandler = (e) => {
//             e.preventDefault();
//         };

//         const dropHandler = (e) => {
//             e.preventDefault();

//             const draggedIndex = e.dataTransfer.getData('text/plain');
//             const droppedIndex = parseInt(e.target.getAttribute('data-index'));

//             const updatedImages = [...images];
//             const updatedPreviewImages = [...previewImages];
//             const updatedVisibleImages = [...visibleImages];

//             const draggedImage = updatedImages[draggedIndex];
//             const draggedPreviewImage = updatedPreviewImages[draggedIndex];
//             const draggedVisibleImage = updatedVisibleImages[draggedIndex];

//             updatedImages.splice(draggedIndex, 1);
//             updatedPreviewImages.splice(draggedIndex, 1);
//             updatedVisibleImages.splice(draggedIndex, 1);

//             updatedImages.splice(droppedIndex, 0, draggedImage);
//             updatedPreviewImages.splice(droppedIndex, 0, draggedPreviewImage);
//             updatedVisibleImages.splice(droppedIndex, 0, draggedVisibleImage);

//             setImages(updatedImages);
//             setPreviewImages(updatedPreviewImages);
//             setVisibleImages(updatedVisibleImages);
//         };

//         document.addEventListener('dragover', dragOverHandler);
//         document.addEventListener('dragenter', dragEnterHandler);
//         document.addEventListener('dragleave', dragLeaveHandler);
//         document.addEventListener('drop', dropHandler);

//         return () => {
//             document.removeEventListener('dragover', dragOverHandler);
//             document.removeEventListener('dragenter', dragEnterHandler);
//             document.removeEventListener('dragleave', dragLeaveHandler);
//             document.removeEventListener('drop', dropHandler);
//         };
//     }, [images, previewImages, visibleImages]);

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         const newImages = [...images, ...files];
//         setImages(newImages);

//         const previewURLs = files.map((file) => URL.createObjectURL(file));
//         setPreviewImages([...previewImages, ...previewURLs]);

//         setVisibleImages([...visibleImages, ...newImages]);
//     };

//     const handleImageDelete = (index) => {
//         const updatedImages = [...images];
//         const updatedPreviewImages = [...previewImages];
//         const updatedVisibleImages = [...visibleImages];

//         updatedImages.splice(index, 1);
//         updatedPreviewImages.splice(index, 1);
//         updatedVisibleImages.splice(index, 1);

//         setImages(updatedImages);
//         setPreviewImages(updatedPreviewImages);
//         setVisibleImages(updatedVisibleImages);
//     };

//     const handleToggleVisibility = (index) => {
//         const updatedVisibleImages = [...visibleImages];
//         updatedVisibleImages[index] = !updatedVisibleImages[index];

//         setVisibleImages(updatedVisibleImages);
//     };

//     const handleImageDragEnd = (e) => {
//         const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//         const droppedIndex = parseInt(e.currentTarget.getAttribute('data-index'));

//         if (draggedIndex !== droppedIndex) {
//             const draggedImage = images[draggedIndex];
//             const draggedPreviewImage = previewImages[draggedIndex];
//             const draggedVisibleImage = visibleImages[draggedIndex];

//             const updatedImages = images.filter(( index) => index !== draggedIndex);
//             const updatedPreviewImages = previewImages.filter((index) => index !== draggedIndex);
//             const updatedVisibleImages = visibleImages.filter((index) => index !== draggedIndex);

//             updatedImages.splice(droppedIndex, 0, draggedImage);
//             updatedPreviewImages.splice(droppedIndex, 0, draggedPreviewImage);
//             updatedVisibleImages.splice(droppedIndex, 0, draggedVisibleImage);
//         }
//     };


//     const handleUpload = () => {
//         const visibleImagesToPost = visibleImages.filter((isVisible, index) => isVisible && images[index]);

//         // console.log(visibleImagesToPost)//

//         // Reset the component state  setImages([]);
//         setPreviewImages([]);
//         setVisibleImages([]);
//     };

//     return (
//         <div>
//             <input type="file" multiple onChange={handleImageChange} />
//             <div style={{ display: "flex", gap: "20px" }}>
//                 {previewImages.map((previewURL, index) => (
//                     <div
//                         key={index}
//                         // draggable={index === 0}
//                         draggable
//                         onDragStart={(e) => {
//                             e.dataTransfer.setData('text/plain', index);
//                         }}
//                         onDragOver={(e) => {
//                             e.preventDefault();
//                         }}
//                         onDrop={(e) => {
//                             e.preventDefault();
//                         }}
//                         onDragEnd={handleImageDragEnd}
//                         data-index={index}
//                     >
//                         {visibleImages[index] && <img style={{ width: '200px', height: "200px" }} src={previewURL} alt={`Preview ${index + 1}`} />}
//                         <button onClick={() => handleImageDelete(index)}>Delete</button>
//                         <button onClick={() => handleToggleVisibility(index)}>
//                             {visibleImages[index] ? 'Hide' : 'Show'}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// import React, { useEffect, useState } from 'react'
// import './ImgsUpload.scss'

// export const ImgsUpload = () => {

//     const [cardList, setCardList] = useState([
//         { id: 1, order: 1, img: "Card 1" },
//         { id: 2, order: 2, img: "Card 2" },
//         { id: 3, order: 3, img: "Card 3" },
//         { id: 4, order: 4, img: "Card 4" },
//     ])

//     const [currentCard, setCurrentCard] = useState(null)

//     const dragStartHandler = ( card) => {
//         // console.log('drag', card);
//         setCurrentCard(card)
//     }

//     const dragOverHandler = (e) => {
//         e.preventDefault()
//     }

//     const dropHandler = (e, card) => {
//         e.preventDefault()
//         // console.log('drop', card)
//         setCardList(cardList.map(c => {
//             if (c.id === card.id) {
//                 return { ...c, order: currentCard.order }
//             }
//             if (c.id === currentCard.id) {
//                 return { ...c, order: card.order }
//             }
//             return c
//         }))
//         // e.target.style.background = "transparent"
//     }

//     const sortCards = (a, b) => {
//         if (a.order > b.order) {
//             return 1
//         } else {
//             return -1
//         }
//     }

//     return (
//         <div style={{ display: "flex", gap: "50px" }}>
//             {cardList.sort(sortCards).map((card) =>
//                 <div
//                     onDragStart={() => dragStartHandler(card)}
//                     onDragOver={(e) => dragOverHandler(e)}
//                     onDrop={(e) => dropHandler(e, card)}
//                     draggable={true}
//                     style={{ width: "200px", height: "200px", border: "1px solid red" }}
//                 >
//                     {card.img}
//                 </div>
//             )}
//         </div>
//     );
// };