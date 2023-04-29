import React, { useEffect, useState } from 'react'
import { Loader } from '../../../components/loading/Loader'
import { Search } from '../../components/inputs/Search'
import { Card } from './components/card/Card'
import baseApi from '../../../apis/baseApi'
import './Structure.scss'

const Structure = () => {
  const [search, setSearch] = useState('')
  const [strInfo, setStrInfo] = useState()
  console.log(strInfo);

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

  return (
    <article className='structure'>
      <div className='structure__sticky'>
        <h3>Form Structure</h3>
        <Search
          value={search}
          placeholder='Search by field'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!strInfo
        ? <Loader />
        : <div className='structure__main'>
          <div className="structure__center">
            <Card
              name="announcement"
              title="Հայտարարություն"
              data={strInfo?.announcement}
            />
            <Card
              name=""
              title="Գտնվելու Վայրը"
              data={strInfo?.location}
            />
            <Card
              name=""
              title="Գինը"
              data={strInfo?.price}
            />
            <Card
              name=""
              title="Տան Նկարագիր"
              data={strInfo?.houseDescription}
            />
            <Card
              name=""
              title="Շինության Նկարագիր"
              data={strInfo?.buildingDescription}
            />
            <Card
              name=""
              title="Կոմունալ Հարմարություններ"
              data={strInfo?.mainFacilities}
            />
            <Card
              name=""
              title="Այլ Հարմարություններ"
              data={strInfo?.otherFacilities}
            />
          </div>

          <div className="structure__right">
            <Card
              name=""
              title="Իրավաբանական"
              data={strInfo?.juridical}
            />
            <Card
              name=""
              title="ԻՆՖՈՐՄԱՑԻԱ"
              data={strInfo?.information}

            />
            <Card
              name=""
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



// {/* <div>
//           {Object.keys(myObject).map(e => (
//             <div key={e}>
//               <h3>{e}</h3>
//               <ul>
//                 {myObject[e].map(item => (
//                   <li>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div> */}


// const myObject = {
//   announcement: ["ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ", "ԳՈՒՅՔԻ ՏԵՍԱԿ", "Հայտարարության վերնագիր", "Հայտարարության ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ", "Հայտարարության ՏԵՍԱԿ", "Ավելացրած հայտ․"],
//   buildingDescription: ["ՇԻՆՈՒԹՅԱՆ ՏԻՊ", "ՀԱՐԿԱՅՆՈՒԹՅՈՒՆ", "ՇԵՆՔԻ ԿԱՌՈՒՑՄԱՆ ՏԱՐԻՆ", "ԿՈՂՄՆՈՐՈՇՈՒՄԸ", "ՏԱՐԵԿԱՆ ԳՈՒՅՔԱՀԱՐԿ", "ԱՄՍԱԿԱՆ ՍՊԱՍԱՐԿՄԱՆ ՎՃԱՐ"],
//   houseDescription: ["ՄԱԿԵՐԵՍ", "ԱՌԱՍՏԱՂԻ ԲԱՐՁՐՈՒԹՅՈՒՆԸ", "ՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ", "ՆՆՋԱՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ", "ՍԱՆՀԱՆԳՈՒՅՑՆԵՐԻ ՔԱՆԱԿ", 'ԲԱՑ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ', 'ՓԱԿ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ', 'ՀԱՐԿԸ', 'ՏԱՆ ՎԻՃԱԿ', 'ԱՎՏՈԿԱՅԱՆԱՏԵՂԻ', 'ԽՈՀԱՆՈՑԻ ՏԻՊ'],
//   information: ["ԻՆՖՈՐՄԱՑԻԱ"],
//   juridical: ["ՍԵՓԱԿԱՆԱՏԵՐ", "ՍԵՓԱԿԱՆԱՏԻՐՈՁ ՀԵՌԱԽՈՍԱՀԱՄԱՐ"],
//   location: ["Համայնք", 'Փողոց', "ՇԵՆՔ", 'ՄՈՒՏՔ', 'ԲՆԱԿԱՐԱՆ', 'ԻՐԱԿԱՆ ՀԱՍՑԵ'],
//   mainFacilities: ["ԱՆՀԱՏԱԿԱՆ ՋԵՌՈՒՑՄԱՆ ՀԱՄԱԿԱՐԳ", "Կենտրոնացված ջեռուցման համակարգ", "Օդորակիչ", "ԿԵՆՏՐՈՆԱՑԱԾ ՀՈՎԱՑՄԱՆ ՀԱՄԱԿԱՐԳ", "ԷԼԵԿՏՐՈԷՆԵՐԳԻԱ", "ԳԱԶ"],
//   otherFacilities: [],
//   price: ["ԸՆԴՀԱՆՈՒՐ ԳԻՆԸ", "ԳԻՆԸ 1քմ", "ԿԱՆԽԱՎՃԱՐԻ ՉԱՓ", "ՎՃԱՐՄԱՆ ԿԱՐԳԸ", "ՆԱԽԸՆՏՐԱԾ ԲԱՆԿԸ"],
//   specialists: ["ԳՈՐԾԱԿԱԼ", "ՄԵՆԵՋԵՐ"],
// }



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