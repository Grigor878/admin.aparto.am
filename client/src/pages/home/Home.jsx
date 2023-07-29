import React, { useEffect } from 'react'
// import cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminData, getSearchData, getTopHomes } from '../../store/slices/homeSlice'
import Main from './components/main/Main'
import Searches from './components/searches/Searches'
import Services from './components/services/Services'
import Contracts from './components/contracts/Contracts'
import Contact from './components/contact/Contact'
import PropType from './components/propType/PropType'
import Faq from './components/faq/Faq'
import './Home.scss'

const Home = () => {
    const dispatch = useDispatch()

    // const lang = cookies.get("i18next")
    
    // useEffect(() => {
    //     dispatch(getSearchData(lang))
    //     console.log(lang);
    // }, [dispatch, lang])


    useEffect(() => {
        dispatch(getTopHomes())
        dispatch(getAdminData())
    }, [dispatch])

    const { sale, rent } = useSelector((state => state.home))

    return (
        <section>
            <Main />
            <div className="contain">
                <div className='home'>
                    <Searches />
                    <PropType type="sale" data={sale} />
                    <PropType type="rent" data={rent} />
                    <Services />
                    <Contracts />
                    <Faq />
                </div>
            </div>
            <Contact />
        </section>
    )
}

export default Home