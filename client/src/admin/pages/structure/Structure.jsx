import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStructureInfo } from '../../../store/slices/structureSlice'
import { Loader } from '../../../components/loading/Loader'
import { Search } from '../../components/inputs/Search'
import { Card } from './components/card/Card'
import './Structure.scss'

const Structure = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const { info } = useSelector((state) => state.structure)
  console.log(info)
  // let keys = Object.keys(info)
  // console.log(keys)

  useEffect(() => {
    dispatch(getStructureInfo())
  }, [dispatch])

  return (
    <article className='structure'>
      <div className='structure__sticky'>
        <h3>Form Structure</h3>
        <Search
          value={search}
          placeholder='Search by field'
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>

      {!info
        ? <Loader />
        : <div className='structure__main'>
          <div className="structure__center">
            <Card
              name="announcement"
              title="Հայտարարություն"
              data={info?.announcement}
              search={"հայտարարություն".includes(search) ? "block" : 'none'}
            />
            <Card
              name="location"
              title="Գտնվելու Վայրը"
              data={info?.location}
              search={"գտնվելու վայրը".includes(search) ? "block" : 'none'}
            />
            <Card
              name="price"
              title="Գինը"
              data={info?.price}
              search={"գինը".includes(search) ? "block" : 'none'}
            />
            <Card
              name="houseDescription"
              title="Տան Նկարագիր"
              data={info?.houseDescription}
              search={"տան նկարագիր".includes(search) ? "block" : 'none'}

            />
            <Card
              name="houseDescription"
              title="Շինության Նկարագիր"
              data={info?.buildingDescription}
              search={"շինության նկարագիր".includes(search) ? "block" : 'none'}
            />
            <Card
              name="mainFacilities"
              title="Կոմունալ Հարմարություններ"
              data={info?.mainFacilities}
              search={"կոմունալ հարմարություններ".includes(search) ? "block" : 'none'}
            />
            <Card
              name="otherFacilities"
              title="Այլ Հարմարություններ"
              data={info?.otherFacilities}
              search={"այլ հարմարություններ".includes(search) ? "block" : 'none'}
            />
          </div>

          <div className="structure__right">
            <Card
              name="juridical"
              title="Իրավաբանական"
              data={info?.juridical}
              search={"իրավաբանական".includes(search) ? "block" : 'none'}
            />
            <Card
              name="information"
              title="ԻՆՖՈՐՄԱՑԻԱ"
              data={info?.information}
              search={"ինֆորմացիա".includes(search) ? "block" : 'none'}
            />
            <Card
              name="specialists"
              title="Կից Մասնագետներ"
              data={info?.specialists}
              search={"կից մասնագետներ".includes(search) ? "block" : 'none'}
            />
          </div>
        </div>
      }
    </article>
  )
}

export default Structure