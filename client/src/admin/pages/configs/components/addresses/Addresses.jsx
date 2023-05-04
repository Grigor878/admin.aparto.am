import React, { useState } from 'react'
import { Search } from '../../../../components/inputs/Search'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'
import './Addresses.scss'
import { Modal } from '../modal/Modal'

export const Addresses = () => {
  const [search, setSearch] = useState("")

  const [open, setOpen] = useState(false)// modal active

  return (
    <section className='addresses'>
      <div className='addresses__top'>
        <Search
          value={search}
          placeholder="Search by address"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <BtnAdd
          onClick={() => setOpen(true)}
          text="Հասցե"
        />
        <Modal
          open={open}
          setOpen={setOpen}
        />
      </div>
    </section>
  )
}
