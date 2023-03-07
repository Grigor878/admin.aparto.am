import React from 'react'
import { useNavigate } from 'react-router-dom'
import Discard from '../../../components/buttons/Discard'
import Custom from '../../../components/buttons/Custom'
import './SubProperties.scss'
import { back } from '../../../svgs/svgs'

const SubProperties = () => {
    const navigate = useNavigate();

    return (
        <article className='subproperties'>
            <div className='subproperties__top'>
                <div className='subproperties__top-right'>
                    <button onClick={() => navigate(-1)}>
                        {back.icon}
                        <span>Back to All Properties</span>
                    </button>
                    <h3>Add a New Property</h3>
                </div>

                <div className='subproperties__top-btns'>
                    <Discard text="Discard" />
                    <Custom text="Add This Property" />
                </div>
            </div>

        </article>
    )
}

export default SubProperties