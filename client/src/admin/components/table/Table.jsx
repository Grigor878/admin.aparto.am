import React from 'react'
import DataTable from 'react-data-table-component'
import './Table.scss'

const Table = ({ Data, Columns, type }) => {
  const data = Data
  const columns = Columns

  return (
    <DataTable
      columns={columns}
      data={data}
      fixedHeader
      defaultSortFieldId={1}
      pagination={type === 'addresses' || type === 'users' ? true : false}
      paginationPerPage={20}
      paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
    />
  )
}

export default Table