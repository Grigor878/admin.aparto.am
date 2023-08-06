import React from 'react'
import { useSelector } from 'react-redux'
import './Styles.scss'

const Result = () => {
  const { searchResult, getAllPropertiesByType } = useSelector((state => state.home))
  console.log("searchRes",searchResult)//
  console.log("allProps",getAllPropertiesByType)//

  return (
    <div>All Properties Result - {searchResult?.length}</div>
  )
}

export default Result