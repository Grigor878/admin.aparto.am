import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConfigsAddresses, removeConfigsAddress } from '../../../../../store/slices/configsSlice'
import { Search } from '../../../../components/inputs/Search'
import { BtnAdd } from '../../../../components/buttons/BtnAdd'
import { Modal } from '../modal/Modal'
import { Loader } from '../../../../../components/loader/Loader'
import Table from '../../../../components/table/Table'
import { remove } from '../../../../svgs/svgs'
import { success } from '../../../../../components/swal/swal'
import './Addresses.scss'

export const Addresses = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const { data, added, removed } = useSelector((state) => state.configs)

  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    dispatch(getConfigsAddresses())
  }, [dispatch, added, removed])

  useEffect(() => {
    if (data) {
      const filtered = data.filter(row => {
        const addressAM = row.am.toLowerCase()
        const addressEN = row.en.toLowerCase()
        const addressRU = row.ru.toLowerCase()
        const searchValue = search.toLowerCase()

        return (
          addressAM.includes(searchValue) || addressEN.includes(searchValue) || addressRU.includes(searchValue)
        )
      })
      setFilteredData(filtered)
    }
  }, [data, search])

  const postRemovedAddress = (e) => {
    let removedAddress = { id: e }

    dispatch(removeConfigsAddress({ removedAddress }))
    success('Address removed !')
  }

  const adressColumns = [
    {
      name: "Հասցե",
      sortable: true,
      selector: row => row.am,
      cell: (row) => <p className="columFontSize">{row.am}</p>,
    },
    {
      name: "",
      cell: (row) => <p className="columFontSize">{row.en}</p>,
    },
    {
      name: "",
      cell: (row) => <p className="columFontSize">{row.ru}</p>,
    },
    {
      name: "",
      cell: (row) => (
        <button
          onClick={() => postRemovedAddress(row.id)}
          className='columnDelete'
        >{remove.icon}
        </button>
      ),
    },
  ];

  return (
    <section className='addresses'>
      <div className='addresses__top'>
        <Search
          value={search}
          placeholder="Փնտրել ըստ հասցեի"
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

      <div className='addresses__bottom'>
        {!filteredData
          ? <Loader />
          : <Table
            Data={filteredData}
            Columns={adressColumns}
            type='addresses'
          />
        }
      </div>
    </section>
  )
}
