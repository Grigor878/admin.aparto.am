import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseApi from '../../../../apis/baseApi';
import { Loader } from '../../../../components/loader/Loader'
import { moneyFormater } from '../../../../helpers/formatters';
import { ReactFullscreenCarousel } from 'react-fullscreen-carousel';
import { API_BASE_URL, getAxiosConfig } from '../../../../apis/config'
import { balcony, buildingType, buildingYear, checked, file, floor, idShevron, kitchenType, location, mail, orentation, propertyType, seeAllImgs, square, tel } from '../../../svgs/svgs'
import { YMap } from '../components/yandexMap/YMap'
import user from '../../../../assets/imgs/user.webp'
import telegram from '../../../../assets/imgs/telegram.png'
import whatsapp from '../../../../assets/imgs/whatsapp.png'
import viber from '../../../../assets/imgs/viber.png'
import './Styles.scss'

const SingleProperty = () => {
    const { id } = useParams()
    const imgsRef = useRef()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    
    // const fetchSinglePropertyData = async () => {
    //     try {
    //       const { data } = await baseApi.get(`/api/getProperties/${id}`)
    //       setData(data)
    //     } catch (error) {
    //       console.log(`Error: ${error.message}`)
    //     } finally {
    //       setLoading(true)
    //     }
    // }
    const fetchSinglePropertyData = async () => {
        try {
          const { data } = await baseApi.get(`/api/getProperties/${id}`, getAxiosConfig())
          setData(data)
        } catch (error) {
          console.log(`Error: ${error.message}`)
        } finally {
          setLoading(true)
        }
      };
    
    useEffect(() => {
        fetchSinglePropertyData()
      // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
    }, [id])
    
    const currentPropertyData = data?.am
    // console.log(currentPropertyData)//
    const currentPropertyKeywords = data?.keywords
    const currentPropertyFiles = data?.file
    
    if(loading && currentPropertyData[7]?.fields[1]?.value?.length) {
        let url = currentPropertyData[7]?.fields[1]?.value
        let videoID = url?.match(/(\?|&)v=([^&#]+)/)[2]
        var embedURL = "https://www.youtube.com/embed/" + videoID
    }

    const currentPropertyImgs = data?.photo
    const modifiedData = currentPropertyImgs?.map((item) => ({
        img: `${API_BASE_URL}/images/${item.name}`,
        alt : item.name
    }))

    useEffect(() => {
        let prevScrollpos = window.scrollY
        window.onscroll = function () {
            const currentScrollPos = window.scrollY
            const imgs = imgsRef.current
            if (prevScrollpos > currentScrollPos) {
                imgs.style.top = "0"
            } else {
                imgs.style.top = "-444px"
            }
            prevScrollpos = currentScrollPos
        }
    }, [])

    return (
        !loading
            ? <Loader />
            : <article className='singleProperty'>
                {!open
                ? <div
                    className='singleProperty__imgs'
                    ref={imgsRef}
                    style={{display : !currentPropertyImgs ? "none" : "flex"}}
                  >
                    <div className='singleProperty__imgs-left' style={{height:"100%"}}>
                     {currentPropertyImgs?.length > 0 &&
                        <img
                            src={API_BASE_URL + `/images/` + currentPropertyImgs[0].name}
                            loading='lazy'
                            alt={currentPropertyImgs[0].name}
                        />
                    }
                    </div>

                    <div className='singleProperty__imgs-right'>
                        {currentPropertyImgs?.slice(1,5)?.map(({ name, visible }) => {
                            return (
                                visible === "true" && 
                                <img
                                    key={name}
                                    src={API_BASE_URL + `/images/` + name}
                                    loading='lazy'
                                    alt={name}
                                />
                            )
                        })}
                        <button
                            onClick={()=> setOpen(true)}
                        >
                            {seeAllImgs.icon} Տեսնել բոլոր նկարները
                        </button>
                    </div>
                </div>
                : <ReactFullscreenCarousel
                    slides={modifiedData}
                    handleClose={() => setOpen(false)}
                    startSlideIndex={0}
                />
                }
                
                <div className='singleProperty__content'>
                    {/* Left */}
                    <div className='singleProperty__content-left'>
                        <div className='singleProperty__content-left-title'>
                            <div className='singleProperty__content-left-title-left'>
                                <h2 className='singleProperty__title'>
                                    {currentPropertyData[0]?.fields[2]?.value}
                                </h2>
                                <p>
                                    {location.icon}
                                    {currentPropertyData[1]?.fields[0]?.communityStreet?.value}
                                    {" "}
                                    {currentPropertyData[1]?.fields[1]?.value},
                                    {" "}
                                    {currentPropertyData[1]?.fields[3]?.value}
                                    {"բն., "}
                                    {currentPropertyData[1]?.fields[0]?.value}
                                    <span onClick={() => window.scrollTo(0, document.body.scrollHeight)}>Տեսնել քարտեզի վրա</span>
                                </p>
                            </div>

                            <div className='singleProperty__content-left-title-right'>
                                <span>{idShevron.icon} {id}</span>
                                <p>{data?.selectedTransationType === "sale" ? "Վաճառք" : "Վարձակալութուն"}</p>
                            </div>
                        </div>

                        <div className='singleProperty__content-left-options'>
                            <div>
                                {propertyType.icon}
                                Գույքի տիպ  -<p>{currentPropertyData[0]?.fields[1]?.value}</p>
                            </div>
                            <div>
                                {square.icon}
                                <p>{currentPropertyData[3]?.fields[0]?.value} մ<sup>2</sup></p>
                            </div>
                            <div>
                                {floor.icon}
                                <p>{currentPropertyData[3]?.fields[8]?.value} / {currentPropertyData[4]?.fields[1]?.value}</p>
                            </div>
                            <div>
                                {balcony.icon}
                                <p>{Number(currentPropertyData[3]?.fields[5]?.value) + Number(currentPropertyData[3]?.fields[6]?.value)}</p> պատշգամբ
                            </div>

                            <div>
                                {buildingType.icon}
                                Շինության տիպ -<p>{currentPropertyData[4]?.fields[0]?.value}</p>
                            </div>

                            {currentPropertyData[4]?.fields[3]?.value &&
                            <div>
                                {buildingYear.icon}
                                Կառուցված -<p>{currentPropertyData[4]?.fields[3]?.value}</p>
                            </div>}

                           <div>
                                {kitchenType.icon}
                                Խոհանոցի տիպ -<p>{currentPropertyData[3]?.fields[11]?.value}</p>
                            </div>

                            {currentPropertyData[4]?.fields[4]?.value &&
                            <div>
                                {orentation.icon}
                                Կողմնորոշում -<p>{currentPropertyData[4]?.fields[4]?.value}</p>
                            </div>}
                        </div>

                        <div className='singleProperty__content-left-desc'>
                            <h3 className='singleProperty__subtitle'>Տան Նկարագիր</h3>

                            <div className='singleProperty__content-left-desc-info'>
                                <p>Սենյակների քանակ - <span>{currentPropertyData[3]?.fields[2]?.value}</span></p>
                                <p>Ննջասենյակների քանակ - <span>{currentPropertyData[3]?.fields[3]?.value}</span></p>
                                <p>Սանհանգույցների քանակ - <span>{currentPropertyData[3]?.fields[4]?.value}</span></p>
                                <p>Փակ պատշգամբների քանակ - <span>{currentPropertyData[3]?.fields[6]?.value}</span></p>
                                <p>Բաց պատշգամբների քանակ - <span>{currentPropertyData[3]?.fields[5]?.value}</span></p>
                                <p>Առաստաղի բարձրություն - <span>{currentPropertyData[3]?.fields[1]?.value} մ</span></p>
                            </div>

                            <p className='singleProperty__content-left-desc-text'>
                                {currentPropertyData[0]?.fields[3]?.value}
                            </p>
                        </div>

                        <div className='singleProperty__content-left-facility'>
                            <h3 className='singleProperty__subtitle'>Կոմունալ Հարմարություններ</h3>

                            <div className='singleProperty__content-left-facility-card'>
                                {currentPropertyData[5]?.fields?.map(({ key, title }) => {
                                    return (
                                        <p key={key}>{checked.icon} {title}</p>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='singleProperty__content-left-otherFacility'>
                            <h3 className='singleProperty__subtitle'>Այլ Հարմարություններ</h3>

                            <div className='singleProperty__content-left-otherFacility-card'>
                                {currentPropertyData[6]?.fields?.map(({ key, title }) => {
                                    return (
                                        <p key={key}>{checked.icon} {title}</p>
                                    )
                                })}
                            </div>
                        </div>

                        {currentPropertyData[7]?.fields[1]?.value?.length 
                        ?   <div className='singleProperty__content-left-video'>
                                <h3 className='singleProperty__subtitle'>Տան Տեսահոլովակ</h3>

                                <div className='singleProperty__content-left-video-card'>
                                    <iframe
                                        width="853"
                                        height="480"
                                        src={embedURL}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded youtube"
                                    />

                                </div>
                            </div>
                            :null}

                        <div className='singleProperty__content-left-location'>
                            <p>
                                {location.icon}
                                {currentPropertyData[1]?.fields[0]?.communityStreet?.value}
                                {" "}
                                {currentPropertyData[1]?.fields[1]?.value},
                                {" "}
                                {currentPropertyData[1]?.fields[3]?.value}
                                {"բն., "}
                                {currentPropertyData[1]?.fields[0]?.value}
                            </p>

                            <div className='singleProperty__content-left-location-map'>
                                <YMap
                                    width="100%"
                                    height="395px"
                                    value={currentPropertyData[1]?.fields[4]?.value}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className='singleProperty__content-right'>
                        <div className='singleProperty__content-right-price'>
                            <h4>Գին։<span>{moneyFormater(currentPropertyData[2]?.fields[0]?.value)}</span></h4>
                            
                            <p>Նախավճարի չափ:<span>{moneyFormater(currentPropertyData[2]?.fields[2]?.value)}</span></p>
                            {currentPropertyData[2]?.fields[1]?.value && 
                            <p>Գինը 1ք.մ :<span>{moneyFormater(currentPropertyData[2]?.fields[1]?.value)}</span></p>}
                            <select>
                                <option>Գնի պատմություն ։</option>
                                <option>$130,000 - 13 May 2023</option>
                                <option>$128,000 - 06 May 2023</option>
                                <option>$135,000 - 29 April 2023</option>
                            </select>
                            <hr />
                           
                            <p>Վճարման կարգ։
                            {currentPropertyData[2]?.fields[4]?.value.includes(",") 
                                ? <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    {currentPropertyData[2]?.fields[4]?.value.split(',').map((item, index) => (
                                        <span key={index}>{item.trim()}</span>
                                    ))}
                                </span>
                                : <span>{currentPropertyData[2]?.fields[4]?.value}</span>
                            }  
                            </p>
                           
                            {currentPropertyData[2]?.fields[5]?.value && 
                            <p>Նախընտրած բանկ։ 
                            {currentPropertyData[2]?.fields[5]?.value.includes(",") 
                                ? <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    {currentPropertyData[2]?.fields[5]?.value?.split(',')?.map((item, index) => (
                                        <span key={index}>{item.trim()}</span>
                                    ))}
                                </span>
                                : <span>{currentPropertyData[2]?.fields[5]?.value}</span>
                            }    
                            </p>}
                            <hr />
                            {currentPropertyData[4]?.fields[5]?.value &&
                            <p>Տարեկան գույքահարկ։<span>$ {currentPropertyData[4]?.fields[5]?.value}</span></p>}
                            {currentPropertyData[4]?.fields[6]?.value &&
                            <p>Ամսական սպասարկման վճար։<span>$ {currentPropertyData[4]?.fields[6]?.value}</span></p>}
                        </div>

                        <div className='singleProperty__content-right-contact'>
                            <h5>Կապ մեզ հետ</h5>

                            <div className='singleProperty__content-right-contact-social'>
                                <div className='singleProperty__content-right-contact-social-card'>
                                    <span>{mail.icon} Էլ. փոստ</span>
                                    <p>info@aparto.am</p>
                                </div>

                                <div className='singleProperty__content-right-contact-social-bottom'>
                                    <div className='singleProperty__content-right-contact-social-card'>
                                        <span>{tel.icon} Բջջ. Հեռ.</span>
                                        <p>+374 99 090909</p>
                                    </div>
                                    <div className='singleProperty__content-right-contact-social-card'>
                                        <div style={{display:"flex", gap:"16px"}}>
                                            <img src={telegram} alt="telegram" />
                                            <img src={whatsapp} alt="whatsapp" />
                                            <img src={viber} alt="viber" />
                                        </div>
                                        <p>+374 99 090909</p>
                                    </div>
                                </div>
                            </div>

                            <div className='singleProperty__content-right-contact-info'>
                                <img src={user} alt="img" />
                                
                                <div className='singleProperty__content-right-contact-info-name'>
                                    <p>Արման Հակոբյան</p>
                                    <span>Ապարտո գործակալ</span>
                                </div>
                            </div>
                        </div>

                        <div className='singleProperty__content-right-specialists'>
                            <h5>Իրավաբանական</h5>

                            <div className='singleProperty__content-right-specialists-fields'>
                                <label>
                                    Սեփականատեր 1
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[9]?.fields[0]?.value}
                                    />
                                </label>
                                <label>
                                    Սեփականատիրոջ հեռախոսահամար
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[9]?.fields[1]?.value}
                                    />
                                </label>

                                {currentPropertyData[9]?.fields[2]?.option[0]?.value?.length &&
                                currentPropertyData[9]?.fields[2]?.option[1]?.value?.length ?
                                <>
                                 <label>
                                    Սեփականատեր 2
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[9]?.fields[2]?.option[0]?.value}
                                    />
                                </label>
                                <label>
                                    Սեփականատիրոջ հեռախոսահամար
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[9]?.fields[2]?.option[1]?.value}
                                    />
                                </label>
                                </>:null}

                                {currentPropertyData[9]?.fields[2]?.option[2]?.value?.length &&
                                currentPropertyData[9]?.fields[2]?.option[3]?.value?.length ?
                                <>
                                 <label>
                                    Սեփականատեր 3
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[9]?.fields[2]?.option[2]?.value}
                                    />
                                </label>
                                <label>
                                    Սեփականատիրոջ հեռախոսահամար
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[9]?.fields[2]?.option[3]?.value}
                                    />
                                </label>
                                </>:null}
                            </div>
                        </div>

                        <div className='singleProperty__content-right-info'>
                            <h5>Լրացուցիչ Ինֆորմացիա</h5>

                            <textarea
                               rows="14"
                               cols="10"
                               wrap="soft"
                               disabled
                            >
                                {currentPropertyData[10]?.fields[0]?.value?.length 
                                ? currentPropertyData[10]?.fields[0]?.value
                                : "Նախընտրած ինֆորմացիա"}
                            </textarea>

                            <div className='singleProperty__content-right-info-uploads'>
                                    {currentPropertyFiles?.map((el)=>{
                                        return(
                                            // eslint-disable-next-line jsx-a11y/anchor-has-content
                                            <div key={el} className='singleProperty__content-right-info-uploads-file'>
                                                {file.icon}
                                                <a target='_blank' href={API_BASE_URL + `/files/` + el} rel="noreferrer">{el}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='singleProperty__content-right-specialists'>
                            <h5>Կից Մասնագետներ</h5>

                            <div className='singleProperty__content-right-specialists-fields'>
                                <label>
                                    Գործակալ
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[11]?.fields[0]?.value}
                                    />
                                </label>
                                {currentPropertyData[11]?.fields[1]?.value && 
                                <label>
                                    Մենեջեր
                                    <input
                                        type="text"
                                        disabled
                                        value={currentPropertyData[11]?.fields[1]?.value}
                                    />
                                </label>}
                            </div>
                        </div>

                        {currentPropertyKeywords.length ?
                        <div className='singleProperty__content-right-keywords'>
                            <h5>Բանալի բառեր</h5>

                            <div className='singleProperty__content-right-keywords-list'>
                                {currentPropertyKeywords?.map((el)=>{
                                    return(
                                        <p key={el}>{el}</p>
                                    )
                                })}
                            </div>
                        </div>
                        :null}

                        <div className='singleProperty__content-right-dates'>
                            <p>Ավելացված է՝ 02/02/2023</p>
                            <p>Փոփոխված է՝ 10/02/2023</p>
                        </div>
                    </div>
                </div>
            </article >
    )
}

export default SingleProperty

// if its not work do with react-image-gallery

// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/scss"
// import "swiper/scss/navigation"
// import "swiper/scss/pagination"

    // < div className = 'singleProperty__imgs' >
    //     <Swiper
    //         slidesPerView={3}
    //         spaceBetween={12}
    //         navigation={true}
    //         pagination={{
    //             type: "fraction",
    //         }}
    //         loop={true}
    //         autoplay={{ delay: 3000, disableOnInteraction: true }}
    //         scrollbar={{ draggable: true }}
    //         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}

    //     // 
    //     >
    //         {currentPropertyImgs?.map(({ name, visible }) => {
    //             if (visible === 'true') {
    //                 return (
    //                     <SwiperSlide key={name}>
    //                         <img src={API_BASE_URL + '/images/' + name} loading='lazy' alt={name} />
    //                     </SwiperSlide>
    //                 );
    //             }
    //             return null; // Ensure a consistent number of slides
    //         })}
    //     </Swiper>
    //             </ >


// for scroll best performance
// if (typeof window.scrollTo === 'function') {
//     window.scrollTo(0, document.body.scrollHeight);
// } else {
//     window.scrollTo(0, document.documentElement.scrollHeight);
// }