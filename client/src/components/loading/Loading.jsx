import React from 'react'
import loading from '../../assets/imgs/loading.gif'

export const Loading = () => {
    return (
        <div className="loading">
            <img src={loading} alt="Loading..." />
        </div>
    )
}
