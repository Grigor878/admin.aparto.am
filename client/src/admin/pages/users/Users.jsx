import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../store/slices/usersSlice'
import TopPart from '../../components/topPart/TopPart'
import Table from '../../components/table/Table'
import { Loader } from '../../../components/loader/Loader'
import { userAdminColumns, userCustomColumns } from './data'
import './Users.scss'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const { userGlobal } = useSelector((state => state?.userGlobal))
  const { users, loading, error } = useSelector((state => state.users))

  const approvedUsers = users?.filter(item => item.status === 'approved')

  return (
    <article className='users'>
      <TopPart
        data={userGlobal?.role === "admin" ? users : approvedUsers}
        type="users"
      />

      <div className="users__table">
        {loading && <Loader />}
        {!loading && error ? <p>Error:{error}</p> : null}
        {!loading && users?.length
          ? <Table
            Data={userGlobal?.role === "admin" ? users : approvedUsers}
            Columns={userGlobal?.role === "admin" ? userAdminColumns : userCustomColumns}
          // type='users'
          />
          : null}
      </div>
    </article>
  )
}

export default Users