import React, { useEffect, useState } from 'react'
import { Search } from '../../../../components/inputs/Search'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'
import './Addresses.scss'
import { Modal } from '../modal/Modal'
import baseApi from '../../../../../apis/baseApi'

export const Addresses = () => {
  const [search, setSearch] = useState("")

  useEffect(()=>{
    baseApi.get('/api/getAddress')
    .then(response => {
        console.log(response.data, 856)
    })
  
    baseApi.get('/api/getAddressForStructure')
    .then(response => {
        console.log(response.data, 999)
    })
    let addressId = {
      id: 4
    }
    baseApi.post('/api/deleteAddress', addressId)
    .then(response => {
        console.log(response.data, 999)
    })
  }, [])
 
  

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
