import React, { useState } from 'react'
import { Tab } from './components/tab/Tab'
import './Configs.scss'
import { Searches } from './components/searches/Searches'
import { Addresses } from './components/addresses/Addresses'

const Configs = () => {
    const [active, setActive] = useState(true)

    return (
        <article className='configs'>
            <Tab
                active={active}
                setActive={setActive}
            />
            {active
                ? <Searches />
                : <Addresses />
            }
        </article>
    )
}

export default Configs