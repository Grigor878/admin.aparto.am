import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { capitalize } from '../../../helpers/formatters'
import { BtnAdd } from '../buttons/BtnAdd'
import './TopPart.scss'

const TopPart = ({data}) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    
    let newPath = pathname.split('/')[2]

    return (
        <div className='topPart'>
            <h3>{data?.length} {capitalize(newPath)}</h3>
            <BtnAdd
                text={newPath === "users"
                    ? capitalize(newPath).slice(0, -1)
                    : capitalize(newPath).slice(0, -3) + "y"
                }
                onClick={() => navigate('add')}
            />
        </div>
    )
}

export default TopPart