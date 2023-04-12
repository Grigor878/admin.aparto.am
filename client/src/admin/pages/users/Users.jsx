import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../store/slices/usersSlice'
import TopPart from '../../components/topPart/TopPart'
import Table from '../../components/table/Table'
import { Loader } from '../../../components/loading/Loader'
import { userAdminColumns, userCustomColumns } from './data'
import './Users.scss'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    console.log('getUsers dispatched in Users page');
  }, [dispatch])

  const { role } = useSelector((state => state.userGlobal.userGlobal))
  const users = useSelector((state => state.users))
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
            Columns={role === "admin" ? userAdminColumns : userCustomColumns}
          />
          : null}
      </div>
    </article>
  )
}

export default Users