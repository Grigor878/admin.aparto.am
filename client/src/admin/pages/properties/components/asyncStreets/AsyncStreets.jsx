import React, { useEffect, useState } from 'react'
import baseApi from '../../../../../apis/baseApi'

export const AsyncStreets = ({ title, id, value, onChange, data, style }) => {
    const [streets, setStreets] = useState([])
    const [communityId, setCommunityId] = useState(10)

    const getStreetsByCommunityId = async () => {
        try {
            const { data } = await baseApi.get(`/api/getAllAddresses/${communityId}`)
            setStreets(data)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    useEffect(() => {
        getStreetsByCommunityId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [communityId])

    // console.log(data)
    // console.log(id)
    console.log(streets)

    return (
        <>
            <label className='addproperties__card-singleselect'>
                {title}
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    // onChange={(e) => console.log(e.target.value)}
                    style={{ width: style }}
                    className="addproperties__card-singleselect-dropdown"
                >
                    {data.map(({ id, name, getOptionName }) => {
                        return (
                            <option
                                key={id}
                                value={getOptionName}
                                onChange={() => setCommunityId(id)}
                            >{name}
                            </option>
                        )
                        // console.log(el.id);
                    })}
                </select>
            </label>
            <label className='addproperties__card-singleselect'>
                Փողոց*
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    style={{ width: "283px" }}
                    className="addproperties__card-singleselect-dropdown"
                >
                    {streets?.map(({ id, am }) => {
                        return (
                            <option
                                key={id}
                                value={id}
                                onChange={() => console.log(id)}
                            >{am}
                            </option>
                        )
                    })}
                </select>
            </label>
        </>
    )
}
