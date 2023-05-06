import React, { useState } from 'react'
import Flag from 'react-world-flags'
import { flags } from '../dropdowns/data'
import { TextLarg } from '../inputs/TextLarg'

export const LngPart = ({ title, id, addProp }) => {
    const [state, setState] = useState('am')

    return (
        <div>
            {state === "am"
                ?
                <div key={id}>
                    <ul className='addproperties__card-flags'>
                        {flags.map(({ country_code }) => (
                            <li key={country_code} >
                                <Flag
                                    code={country_code}
                                    onClick={() => setState(country_code)}
                                    width="36"
                                    height="20"
                                    className={state === country_code ? 'addproperties__card-flags-flagActive' : 'addproperties__card-flags-flag'}
                                />
                            </li>
                        ))}
                    </ul>
                    <TextLarg
                        id={id + "_" + state}
                        title={title}
                        placeholder="Գրեք նկարագրությունը"
                        onChange={addProp}
                    />
                </div>
                : state === "ru"
                    ?
                    <div key={id}>
                        <ul className='addproperties__card-flags'>
                            {flags.map(({ country_code }) => (
                                <li key={country_code} >
                                    <Flag
                                        code={country_code}
                                        onClick={() => setState(country_code)}
                                        width="36"
                                        height="20"
                                        className={state === country_code ? 'addproperties__card-flags-flagActive' : 'addproperties__card-flags-flag'}
                                    />
                                </li>
                            ))}
                        </ul>
                        <TextLarg
                            id={id + "_" + state}
                            title={title}
                            placeholder="Գրեք նկարագրությունը"
                            onChange={addProp}
                        />
                    </div>
                    :
                    <div key={id}>
                        <ul className='addproperties__card-flags'>
                            {flags.map(({ country_code }) => (
                                <li key={country_code} >
                                    <Flag
                                        code={country_code}
                                        onClick={() => setState(country_code)}
                                        width="36"
                                        height="20"
                                        className={state === country_code ? 'addproperties__card-flags-flagActive' : 'addproperties__card-flags-flag'}
                                    />
                                </li>
                            ))}
                        </ul>
                        <TextLarg
                            id={id + "_" + state}
                            title={title}
                            placeholder="Գրեք նկարագրությունը"
                            onChange={addProp}
                        />
                    </div>
            }
        </div>
    )
}
