import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getViewData } from '../../store/slices/viewSlice'

const ResultById = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getViewData(id))
  }, [dispatch, id])

  const { data, loading } = useSelector((state => state.view))
  console.log(data);

  return (
    loading ? <p>loading</p> : <div>Result By Id</div>
  )
}

export default ResultById