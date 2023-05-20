import React, { useState } from 'react'
import Flag from 'react-world-flags'
import { flags } from '../dropdowns/data'
import { TextLarg } from '../inputs/TextLarg'

export const LngPart = ({ title, id, style, onChange }) => {
    const [activeFlag, setActiveFlag] = useState('am')
    const [arm, setArm] = useState('')
    const [rus, setRus] = useState('')
    const [eng, setEng] = useState('')

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
                    placeholder="Գրեք նկարագրությունը"
                    // onChange={addProp}
                    onChange={(e) => { setArm(e.target.value); onChange(e) }}
                />
                : activeFlag === "ru"
                    ? <TextLarg
                        id={id + "Ru"}
                        value={rus}
                        title={title}
                        placeholder="Գրեք նկարագրությունը"
                        // onChange={addProp}
                        onChange={(e) => { setRus(e.target.value); onChange(e) }}

                    />
                    : <TextLarg
                        id={id + "En"}
                        value={eng}
                        title={title}
                        placeholder="Գրեք նկարագրությունը"
                        // onChange={addProp}
                        onChange={(e) => { setEng(e.target.value); onChange(e) }}
                    />}
        </div >
    )
}
