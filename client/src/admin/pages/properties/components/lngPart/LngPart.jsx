import React, { useState } from 'react'
import Flag from 'react-world-flags'
import { flags } from '../dropdowns/data'
import { TextLarg } from '../inputs/TextLarg'

export const LngPart = ({ title, value, id, style, required, onChange }) => {
    // console.log(value)//
    const [activeFlag, setActiveFlag] = useState('am')
    const [arm, setArm] = useState('')
    const [rus, setRus] = useState('')
    const [eng, setEng] = useState('')

    let placeholder = title?.split(" ").pop().slice(0, -1).toLowerCase() + "ը"

    return (
        <div key={id} style={{ width: style }}>
            <ul className="addproperties__card-flags">
                {flags.map(({ country_code }) => (
                    <li key={country_code}>
                        <Flag
                            code={country_code}
                            onClick={() => setActiveFlag(country_code)}
                            className={activeFlag === country_code ? 'addproperties__card-flags-flagActive' : 'addproperties__card-flags-flag'}
                            width="36"
                            height="20"
                        />
                    </li>
                ))}
            </ul>

            {activeFlag === "am"
                ? <TextLarg
                    id={id + "Am"}
                    value={arm}
                    title={title}
                    required={required}
                    placeholder={`Գրեք ` + placeholder}
                    onChange={(e) => { setArm(e.target.value); onChange(e) }}
                />
                : activeFlag === "ru"
                    ? <TextLarg
                        id={id + "Ru"}
                        value={rus}
                        title={title}
                        required={required}
                        placeholder={`Գրեք ` + placeholder}
                        onChange={(e) => { setRus(e.target.value); onChange(e) }}

                    />
                    : <TextLarg
                        id={id + "En"}
                        value={eng}
                        title={title}
                        required={required}
                        placeholder={`Գրեք ` + placeholder}
                        onChange={(e) => { setEng(e.target.value); onChange(e) }}
                    />}
        </div >
    )
}
