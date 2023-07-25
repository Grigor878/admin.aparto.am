import React from 'react'
import { useTranslation } from 'react-i18next'
import './Faq.scss'

const Faq = () => {
    const { t } = useTranslation()

    return (
        <div className='faq'>
            <div className="faq__left">
                <h2 className='title'>{t("faq_title")}</h2>

                <div className='faq__left-text'>
                    <p>{t("faq_text")}</p>
                    <a href="#contact">{t("header_contact")}</a>
                </div>
            </div>

            <div className="faq__right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, mollitia! Perspiciatis itaque neque possimus ea excepturi pariatur incidunt reiciendis consequuntur laborum repellendus officiis quos dignissimos assumenda, amet minima commodi quo, nihil molestiae praesentium cupiditate ex. Eligendi repudiandae obcaecati atque facilis ullam nemo maxime assumenda. Tempore obcaecati cumque consectetur fugit sed delectus blanditiis pariatur. Nesciunt, voluptate nam aliquam praesentium quod vitae vel, dolor error culpa iste blanditiis odit, sapiente numquam exercitationem quis ipsum reprehenderit. Nobis natus nam nesciunt quia, numquam quo soluta eaque perspiciatis velit nostrum quasi, odit explicabo ex? Reiciendis accusamus, facilis odit, ratione optio odio rem natus ullam similique magnam cum illo unde enim dolorem maiores non vel, molestias assumenda vero. Doloremque non eaque doloribus ullam sed alias dolores, ipsam quam animi? Omnis, pariatur nobis. Ipsum nihil deserunt molestiae itaque inventore eveniet quia laborum eius! Ipsa possimus corrupti porro accusantium. Nam ratione dolorem sed veniam, corrupti quidem ab vel tempora deserunt ullam? Ea, consectetur mollitia obcaecati quia fuga tempore quae reiciendis aut necessitatibus voluptatibus dicta, doloribus cumque quas adipisci. Quidem quia, tempora sapiente distinctio nulla autem dolorem sequi! Odit repellendus tempora laboriosam, magnam, quae est sapiente, iste saepe nisi veritatis fuga? Possimus nobis excepturi porro iure dicta maxime deleniti.
            </div>
        </div>
    )
}

export default Faq