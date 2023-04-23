import React, { useState } from 'react'
import './Structure.scss'
import axios from 'axios';
import { API_BASE_URL } from '../../../apis/config';

const Structure = () => {
  const [val, setVal] = useState('')
  let obj = {
    haytararutyun: {},
    location: {},
    price: {},
  }
const changeGenForm = (e) =>{
  
  let genName = e.target.getAttribute('gen-name');
  console.log(genName);
   obj[[genName]] = {
      val
  }
 axios.post(API_BASE_URL + '/api/addGlobalFormField', obj).then()
console.log(obj);

}

  return (
    <article className='structure'>
      <h3>Structure</h3>
      <h4>Avelacnel guyq</h4>
      <h5>Haytarutyun</h5>
      <h5>Guyqi tesa</h5>
      <h5>Vernagir</h5>
      <input type='text' value={val} onChange={(e)=>{setVal(e.target.value)}} />
      <button gen-name='haytararutyun'  onClick={(e)=>changeGenForm(e)}>add prop</button>
    </article>
  )
}

export default Structure