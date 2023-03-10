import React from 'react'
import TopPart from '../../components/topPart/TopPart'
import Table from '../../components/table/Table'
import { userTableData, userTableColumns } from './data'
import './Users.scss'

const Users = () => {

  return (
    <article className='users'>
      <TopPart data={userTableData} />

      <div className="users__table">
        <Table
          Data={userTableData}
          Columns={userTableColumns}
        />
      </div>
    </article>
  )
}

export default Users