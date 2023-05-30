import React, { useEffect, useState } from 'react'
import baseApi from '../../../../../apis/baseApi'

export const CommunitySelect = ({ title, id, value, defValue, valueId, onChange, onStreetChange, data, streetData, style, required }) => {
    const [streets, setStreets] = useState([])
    const [communityId, setCommunityId] = useState(valueId ? valueId : 1)

    const getStreetsByCommunityId = async () => {
        try {
            const { data } = await baseApi.get(`/api/getAllAddresses/11`)
            setStreets(data)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    console.log(streetData)

    useEffect(() => {
        getStreetsByCommunityId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [communityId])

    const handleChange = (e) => {
        let id = e.target.value.replace(/\D/g, "")
        // let idSend = e.target.value
        setCommunityId(id)
        onChange(e)
    }

    console.log(streets)

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "283px" }}>
            <label className='addproperties__card-singleselect'>
                {title}
                <select
                    id={id}
                    required={required}
                    value={value}
                    onChange={handleChange}
                    style={{ width: style }}
                    className="addproperties__card-singleselect-dropdown"
                >
                    {data?.map(({ id, name, getOptionName, value }) => {
                        return (
                            <option
                                key={id}
                                value={getOptionName + id}
                                selected={value === defValue}
                            >{name}
                            </option>
                        )
                    })}
                </select>
            </label>
            {/* 283px */}
            <label className='addproperties__card-singleselect' style={{ width: streetData?.style }}>
                {streetData?.title}
                <select
                    id={id}
                    required
                    defaultValue={value}
                    onChange={(e) => onStreetChange(e.target.value)}
                    className="addproperties__card-singleselect-dropdown"
                >
                    {streets.id === 1
                        ? <option>{streets.am}</option>
                        : streets?.map(({ id, am }) => {
                            return (
                                <option
                                    key={id}
                                    value={id}
                                    selected={am === "Բաղյան"}
                                >{am}
                                </option>
                            )
                        })
                    }
                </select>
            </label>
        </div>
    )
}
