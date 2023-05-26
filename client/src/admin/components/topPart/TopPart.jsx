import React from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
// import { capitalize } from '../../../helpers/formatters'
import { BtnAdd } from '../buttons/BtnAdd'
import './TopPart.scss'

const TopPart = ({ data }) => {
    // const { role } = useSelector((state => state.userGlobal.userGlobal))
    const { pathname } = useLocation()
    const navigate = useNavigate()

    let newPath = pathname.split('/')[2]

    return (
        <div className='topPart'>
            <h3>
                {/* {data?.length === 1 ? data?.length + ' ' + capitalize(newPath.slice(0, -1)) : data?.length === 0 ? 'No Data' : data?.length + ' ' + capitalize(newPath)} */}
                {newPath === "users" ? data?.length + " Օգտատեր" : null}
                {newPath === "properties" ? data?.length + " Գույք" : null}
            </h3>

            {/* {role === "admin" ?
                <BtnAdd
                    // text={newPath === "users"
                    //     ? capitalize(newPath).slice(0, -1)
                    //     : capitalize(newPath).slice(0, -3) + "y"
                    // }
                    onClick={() => navigate('add')}
                />
                : null
            } */}

            <BtnAdd onClick={() => navigate('add')} />

        </div>
    )
}

export default TopPart