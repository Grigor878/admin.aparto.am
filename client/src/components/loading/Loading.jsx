import React from 'react'
import Loader from '../../assets/imgs/loader.gif'

const Loading = () => {
    return (
        <div className="loader">
            {/* <div className="container"> */}
            <img src={Loader} alt="Loading..." />
            {/* </div> */}
        </div>
    )
}

export default Loading