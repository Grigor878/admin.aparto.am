import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { capitalize } from '../../../helpers/formatters';
import Add from '../buttons/Add';
import './TopPart.scss'

const TopPart = ({ data }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    let newPath = pathname.split('/')[2]

    return (
        <div className='topPart'>
            {/* <p>{data.length} {newPath}</p> */}
            <p>{capitalize(newPath)}</p>
            <Add
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