import React, { useEffect, useState } from 'react'
import TopPart from '../../components/topPart/TopPart'
import baseApi from '../../../apis/baseApi'
import Table from '../../components/table/Table'
import { userTableData, userTableColumns } from './data'
import './Users.scss'

const Users = () => {
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(false)

  const getUsers = async () => {
    try {
      const { data } = await baseApi.get(`/api/getUsers`)
      setUsers(data)
      // console.log(data)
    } catch (error) {
      console.log(`Error: ${error.message}`)
    } finally {
      setLoading(true)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <article className='users'>
      <TopPart data={userTableData} />

      <div className="users__table">
        {!loading ?
          <p>Loading...</p> :
          <Table
            Data={userTableData}
            Columns={userTableColumns}
          />}
      </div>
    </article>
  )
}

export default Users