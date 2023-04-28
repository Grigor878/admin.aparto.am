import React, { useEffect, useState } from 'react'
import { Loader } from '../../../components/loading/Loader'
import { Search } from '../../components/inputs/Search'
import { Card } from './components/card/Card'
import { random } from '../../../helpers/utils'
import baseApi from '../../../apis/baseApi'
import './Structure.scss'

const Structure = () => {
  const [search, setSearch] = useState('')
  const [strInfo, setStrInfo] = useState()
  // console.log(strInfo)

  // Sranq uje chen ylni AddModali mej nayi comment ka
  const [juridical, setJuridical] = useState()
  const [information, setInformation] = useState()
  const [specialists, setSpecialists] = useState()

  const getStrInfo = async () => {
    try {
      const { data } = await baseApi.get('/api/getFormStructure')
      setStrInfo(data)
    } catch (err) {
      console.log(`Get Structure Info: ${err.message}`);
    }
  }

  useEffect(() => {
    getStrInfo()
  }, [])

  // Esi el ste petq chi Add Modal.jsx i meja
  // const postAddedField = (val) => {
  //   let unique = random(100)

  //   let am = {
  //     [val]: {
  //       name: eval(val),
  //       id: eval(val) + unique
  //     }
  //   }
  //   let ru = {
  //     [val]: {
  //       name: eval(val),
  //       id: eval(val) + unique,
  //     }
  //   }
  //   let en = {
  //     [val]: {
  //       name: eval(val),
  //       id: eval(val) + unique,
  //     }
  //   }

  //   const global = { am, en, ru }
  //   console.log(global);
  //   baseApi.post('/api/addGlobalFormField', global)
  // }

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

          <div className="structure__right">
            <Card
              title="Իրավաբանական"
              data={strInfo?.juridical}
              // onClick={() => postAddedField('juridical')}
            />
            {/* <input type='text' onChange={(e) => setJuridical(e.target.value)} /> */}
            <Card
              title="ԻՆՖՈՐՄԱՑԻԱ"
              data={strInfo?.information}
              // onClick={() => postAddedField('information')}
            />
            {/* <input type='text' onChange={(e) => setInformation(e.target.value)} /> */}
            <Card
              title="Կից Մասնագետներ"
              data={strInfo?.specialists}
              // onClick={() => postAddedField('specialists')}
            />
            {/* <input type='text' onChange={(e) => setSpecialists(e.target.value)} /> */}
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