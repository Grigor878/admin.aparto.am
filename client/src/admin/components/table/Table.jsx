import React from 'react'
import DataTable from 'react-data-table-component'

const Table = ({ Data, Columns }) => {
  const data = Data
  const columns = Columns

  return (
    <DataTable
      columns={columns}
      data={data}
      fixedHeader
      defaultSortFieldId={1}
      // pagination
      // progressPending={<Loading />}
    />
  )
}

export default Table