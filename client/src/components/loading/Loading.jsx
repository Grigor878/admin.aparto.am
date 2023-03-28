import React from 'react'
import Loader from '../../assets/imgs/loader.gif'

const Loading = () => {
    return (
        <div className="loader">
            <img src={Loader} alt="Loading..." />
        </div>
    )
}

export default Loading