import React from 'react'
import './Home.scss'

import { useSelector, useDispatch } from 'react-redux'
import { testSelector, testIncr, testDecr } from '../../store/slices/testSlices'

const Home = () => {

    const test = useSelector(testSelector.getTest)
    const dispatch = useDispatch()

    return (
        <section>
            <div className="container">
                <h1>Home</h1>

                <div className='test'>
                    <h2>Redux test</h2>

                    <div>
                        <h4>{test}</h4>
                        <button onClick={() => dispatch(testIncr())}>Incr</button>
                        <button onClick={() => dispatch(testDecr())}>Decr</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home