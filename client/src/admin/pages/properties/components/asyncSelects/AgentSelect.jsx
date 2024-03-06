import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import baseApi from '../../../../../apis/baseApi'
import { getAxiosConfig } from '../../../../../apis/config'
import './Styles.scss'

export const AgentSelect = ({ title, value, id, onChange, style, required }) => {
    // const { role } = useSelector((state => state.userGlobal.userGlobal))
    const { userGlobal } = useSelector((state => state.userGlobal))

    const [data, setData] = useState([])

    const getAgents = async () => {
        try {
            const { data } = await baseApi.get('/api/getAgent', getAxiosConfig())
            setData(data)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    useEffect(() => {
        getAgents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const parsedNames = [
        {
            id: "",
            name: "Ընտրեք"
        },
        ...data.map(item => {
            const parsedName = JSON.parse(item.full_name)
            return {
                id: item.id,
                name: parsedName.am
            }
        })
    ]

    return (
        <label className='addproperties__card-singleselect'>
            {title}
            <select
                id={id}
                required={required}
                onChange={onChange}
                style={{ width: style }}
                className="addproperties__card-singleselect-dropdown"
            >
                {parsedNames?.map(({ id, name }) => {
                    return (
                        <option
                            key={id}
                            value={id}
                            disabled={userGlobal?.role === "agent" ? true : false}
                            selected={id === value}//
                        >{name}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}