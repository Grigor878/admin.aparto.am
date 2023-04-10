import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../store/slices/usersSlice'
import TopPart from '../../components/topPart/TopPart'
import Table from '../../components/table/Table'
import { Loader } from '../../../components/loading/Loader'
import { userTableColumns } from './data'
import './Users.scss'

const Users = () => {
  const users = useSelector((state => state.user))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const allUsers = users.users

  return (
    <article className='users'>
      <TopPart data={allUsers} />

      <div className="users__table">
        {users.loading && <Loader />}
        {!users.loading && users.error ? <p>Error:{users.error}</p> : null}
        {!users.loading && users.users.length
          ? <Table
            Data={allUsers}
            Columns={userTableColumns}
          />
          : null}
      </div>
    </article>
  )
}

export default Users