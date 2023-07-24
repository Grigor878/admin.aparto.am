import React from 'react'
import { useDispatch } from 'react-redux'
import Searches from './components/searches/Searches'
import Services from './components/services/Services'
import Contracts from './components/contracts/Contracts'
import Contact from './components/contact/Contact'
import PropType from './components/propType/PropType'
import './Home.scss'
import { getSale } from '../../store/slices/homeSlice'

const Home = () => {
    const dispatch = useDispatch()

    dispatch(getSale())
    dispatch(getSale())

    return (
        <section>
            <div className="contain">
                <div className='home'>
                    <Searches />
                    <PropType type="sale" />
                    <PropType type="rent" />
                    <Services />
                    <Contracts />
                </div>
            </div>
            <Contact />
        </section>
    )
}

export default Home