import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserGlobal } from '../../../store/slices/userGlobalSlice'
import Paths from './components/paths/Paths'
import User from './components/user/User'
import './Sidebar.scss'
import baseApi from '../../../apis/baseApi'
import { GetAxiosConfig } from '../../../apis/config'

const Sidebar = () => {
  const userGlobal = useSelector((state => state.userGlobal))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserGlobal())
  }, [dispatch])

  console.log(userGlobal, 3366)

  // const [state, setState] = useState()

  // baseApi.post('/api/getGlobalUser', null, GetAxiosConfig())
  //   .then((response) => {
  //     console.log(response.data)
  //     // setState(response.data)
  //   })

  // console.log(state)


  return (
    <div className='sidebar'>
      <h1>Logo</h1>

      <nav className='sidebar__nav'>
        <Paths />
        <User />
      </nav>
    </div>
  )
}

export default Sidebar