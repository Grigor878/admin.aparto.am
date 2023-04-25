import React, { useEffect, useState } from 'react'
import { Loader } from '../../../components/loading/Loader'
import { Search } from '../../components/inputs/Search'
import { Card } from './components/card/Card'
// import { AddModal } from '../../components/modals/AddModal'
import baseApi from '../../../apis/baseApi'
import './Structure.scss'
import axios from 'axios'

const Structure = () => {
  const [search, setSearch] = useState('')
  const [strInfo, setStrInfo] = useState();
  const [juridical, setJuridical] = useState();

  const getStrInfo = async () => {
    try {
      const { data } = await baseApi.get('/api/getFormStructure')
      setStrInfo(data)
    } catch (err) {
      console.log(`Get Structure Info: ${err.message}`);
    }
  }
  console.log(strInfo);

  useEffect(() => {
    getStrInfo()
  }, [])

  const searchResult = (e) => {
    setSearch(e.target.value)
  }

  const postAddedField = (val) => {
    let am = {
      [val]: {
        name: juridical
      }
    }
    let ru = {
      [val]: {
        name: juridical
      }
    }
    let en = {
      [val]: {
        name: juridical
      }
    }
    let global = {am, en, ru}
    console.log(global);
    baseApi.post('/api/addGlobalFormField', global).then(

    )
  }

  return (
    <article className='structure'>
      <div className='structure__sticky'>
        <h3>Form Structure</h3>
        <Search
          value={search}
          placeholder='Search by field'
          onChange={searchResult}
        />
      </div>

      {!strInfo
        ? <Loader />
        : <div className='structure__main'>
          <div className="structure__center">
            <Card
              title="Հայտարարություն"
              data={strInfo?.announcement}
            />
            <Card
              title="Գտնվելու Վայրը"
              data={strInfo?.location}
            />
            <Card
              title="Գինը"
              data={strInfo?.price}
            />
            <Card
              title="Տան Նկարագիր"
              data={strInfo?.houseDescription}
            />
            <Card
              title="Շինության Նկարագիր"
              data={strInfo?.buildingDescription}
            />
            <Card
              title="Կոմունալ Հարմարություններ"
              data={strInfo?.mainFacilities}
            />
            <Card
              title="Այլ Հարմարություններ"
              data={strInfo?.otherFacilities}
            />
          </div>

          {/* <AddModal /> */}

          <div className="structure__right">
            <Card
              title="Իրավաբանական"
              data={strInfo?.juridical}
              onClick={() => postAddedField('juridical')}
            />
            <input type='text' onChange={(e) => setJuridical(e.target.value)} />
            <Card
              title="ԻՆՖՈՐՄԱՑԻԱ"
              data={strInfo?.information}
            />
            <Card
              title="Կից Մասնագետներ"
              data={strInfo?.specialists}
            />

          </div>
        </div>
      }

    </article>
  )
}

export default Structure


// import axios from 'axios'
// import { API_BASE_URL } from '../../../apis/config'


//   const [val, setVal] = useState('')
//   let obj = {
//     haytararutyun: {},
//     location: {},
//     price: {},
//   }
// const changeGenForm = (e) =>{

//   let genName = e.target.getAttribute('gen-name');
//   console.log(genName);
//    obj[[genName]] = {
//       val
//   }
//  axios.post(API_BASE_URL + '/api/addGlobalFormField', obj).then()
// console.log(obj);

// }



// <h4>Avelacnel guyq</h4>
//       <h5>Haytarutyun</h5>
//       <h5>Guyqi tesa</h5>
//       <h5>Vernagir</h5>
//       <input type='text' value={val} onChange={(e)=>{setVal(e.target.value)}} />
//       <button gen-name='haytararutyun'  onClick={(e)=>changeGenForm(e)}>add prop</button>