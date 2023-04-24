import React, { useState } from 'react'
import { Search } from '../../components/inputs/Search'
import { Card } from './components/card/Card'
import { announcement, location,price } from './components/card/data'
import './Structure.scss'
import { AddModal } from '../../components/modals/AddModal'

const Structure = () => {
  const [search, setSerach] = useState('')

  const searchByField = (e) => {
    setSerach(e.target.value)
  }
  console.log(search)//

  return (
    <article className='structure'>
      <h3>Form Structure</h3>
      <Search
        value={search}
        placeholder='Search by field'
        onChange={searchByField}
      />

      <div className='structure__main'>
        <div className="structure__center">
          <Card
            title="Announcement"
            data={announcement}
          />
          <Card
            title="Location"
            data={location}
          />
          <Card
            title="Cost"
            data={price}
          />
        </div>

        {/* <AddModal /> */}

        <div className="structure__right">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet est officiis recusandae esse voluptatem repellendus laborum aliquam temporibus reprehenderit assumenda molestias, fugit itaque dignissimos dolor sed voluptas, eaque ad placeat quis. Cum, ipsa reiciendis totam soluta natus repellat quaerat eaque consequuntur, error quam ad repudiandae facilis eos iste itaque perferendis quasi, quia ex. Dignissimos aliquid quia, non corporis impedit voluptates sequi pariatur fuga facere delectus odit? Eveniet, officiis magni corporis veritatis ea tempora aspernatur vitae earum, eos, modi sunt deserunt? Sit corrupti nam distinctio, sed aut nisi. Quam, dolore rerum doloremque officiis recusandae mollitia neque ipsam quidem sapiente? Maiores, aut!
        </div>
      </div>

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