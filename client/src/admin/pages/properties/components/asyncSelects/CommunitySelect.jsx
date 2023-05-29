import React, { useEffect, useState } from 'react'
import baseApi from '../../../../../apis/baseApi'

export const CommunitySelect = ({ title, id, value, defValue, onChange, onStreetChange, data, style, required }) => {
    const [streets, setStreets] = useState([])
    const [communityId, setCommunityId] = useState(1)
    // const [communityId, setCommunityId] = useState(defValue ? 11 : 1)

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

    const handleChange = (e) => {
        let id = e.target.value.replace(/\D/g, "")
        setCommunityId(id)
        onChange(e)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "267px" }}>
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
            <label className='addproperties__card-singleselect' style={{ width: "283px" }}>
                Փողոց*
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
                                    // selected={defValue ? 10 : null}
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
