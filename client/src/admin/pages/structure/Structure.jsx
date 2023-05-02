import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStructureInfo } from "../../../store/slices/structureSlice"
import { Loader } from "../../../components/loading/Loader"
import { Search } from "../../components/inputs/Search"
import { Card } from "./components/card/Card"
import "./Structure.scss"

const Structure = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState("")

  const { info } = useSelector((state) => state.structure)

  const center = info?.slice(0, 7)
  const right = info?.slice(7, 10)

  useEffect(() => {
    dispatch(getStructureInfo())
    // console.log(info)//
  }, [dispatch])

  return (
    <article className="structure">
      <div className="structure__sticky">
        <h3>Form Structure</h3>
        <Search
          value={search}
          placeholder="Search by field"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>

      {!info ? (
        <Loader />
      ) : (
        <div className="structure__main">
          <div className="structure__center">
            {center?.map(({ title, name, data, added }) => {
              return (
                <Card
                  key={name}
                  title={title}
                  name={name}
                  data={data}
                  added={added}
                  search={title.toLowerCase().includes(search) ? "block" : 'none'}
                />
              )
            })}
          </div>

          <div className="structure__right">
            {right?.map(({ title, name, data, added }) => {
              return (
                <Card
                  key={name}
                  title={title}
                  name={name}
                  data={data}
                  added={added}
                  search={title.toLowerCase().includes(search) ? "block" : 'none'}
                />
              )
            })}
          </div>
        </div>
      )}
    </article>
  );
};

export default Structure

// added2: [{ 2: "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ", 3: "ԳՈՐԾԱՐՔԻ Օրինակ" }],
// const test = [
//   {
//     name: "announcement",
//     title: "Հայտարարություն",
//     data: [
//       "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ",
//       "ԳՈՒՅՔԻ ՏԵՍԱԿ",
//       "Հայտարարության վերնագիր",
//       "Հայտարարության ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ",
//       "Հայտարարության ՏԵՍԱԿ",
//     ],
//     added: [{ 1: "ԳՈՐԾԱՐՔԻ ՄԱՍՆԻԿ" }, { 2: "ԳՈՐԾԱՐՔԻ Օրինակ" }],
//   },
//   {
//     name: "location",
//     title: "Գտնվելու Վայրը",
//     data: ["Համայնք", "Փողոց", "ՇԵՆՔ", "ՄՈՒՏՔ", "ԲՆԱԿԱՐԱՆ", "ԻՐԱԿԱՆ ՀԱՍՑԵ"],
//   },
//   {
//     name: "price",
//     title: "Գինը",
//     data: [
//       "ԸՆԴՀԱՆՈՒՐ ԳԻՆԸ",
//       "ԳԻՆԸ 1քմ",
//       "ԿԱՆԽԱՎՃԱՐԻ ՉԱՓ",
//       "ՎՃԱՐՄԱՆ ԿԱՐԳԸ",
//       "ՆԱԽԸՆՏՐԱԾ ԲԱՆԿԸ",
//     ],
//   },
//   {
//     name: "houseDescription",
//     title: "Տան Նկարագիր",
//     data: [
//       "ՄԱԿԵՐԵՍ",
//       "ԱՌԱՍՏԱՂԻ ԲԱՐՁՐՈՒԹՅՈՒՆԸ",
//       "ՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
//       "ՆՆՋԱՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
//       "ՍԱՆՀԱՆԳՈՒՅՑՆԵՐԻ ՔԱՆԱԿ",
//       "ԲԱՑ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
//       "ՓԱԿ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
//       "ՀԱՐԿԸ",
//       "ՏԱՆ ՎԻՃԱԿ",
//       "ԱՎՏՈԿԱՅԱՆԱՏԵՂԻ",
//       "ԽՈՀԱՆՈՑԻ ՏԻՊ",
//     ],
//   },
//   {
//     name: "buildingDescription",
//     title: "Շինության Նկարագիր",
//     data: [
//       "ՇԻՆՈՒԹՅԱՆ ՏԻՊ",
//       "ՀԱՐԿԱՅՆՈՒԹՅՈՒՆ",
//       "ՇԵՆՔԻ ԿԱՌՈՒՑՄԱՆ ՏԱՐԻՆ",
//       "ԿՈՂՄՆՈՐՈՇՈՒՄԸ",
//       "ՏԱՐԵԿԱՆ ԳՈՒՅՔԱՀԱՐԿ",
//       "ԱՄՍԱԿԱՆ ՍՊԱՍԱՐԿՄԱՆ ՎՃԱՐ",
//     ],
//   },
//   {
//     name: "mainFacilities",
//     title: "Կոմունալ Հարմարություններ",
//     data: [
//       "ԱՆՀԱՏԱԿԱՆ ՋԵՌՈՒՑՄԱՆ ՀԱՄԱԿԱՐԳ",
//       "Կենտրոնացված ջեռուցման համակարգ",
//       "Օդորակիչ",
//       "ԿԵՆՏՐՈՆԱՑԱԾ ՀՈՎԱՑՄԱՆ ՀԱՄԱԿԱՐԳ",
//       "ԷԼԵԿՏՐՈԷՆԵՐԳԻԱ",
//       "ԳԱԶ",
//     ],
//   },
//   {
//     name: "otherFacilities",
//     title: "Այլ Հարմարություններ",
//     data: [
//       "ԿԱՀՈՒՅՔ",
//       "Տեխնիկա",
//       "Վերելակ",
//       "ՓԱԿ ՏՆՏԵՍԱԿԱՆ ՊԱՏՇԳԱՄԲ",
//       "ԵՎՐՈՊԱՏՈՒՀԱՆ",
//       "ԼԱՄԻՆԱՏ",
//       "ՄԱՆՐԱՀԱՏԱԿ",
//       "ՍԱԼԻԿԱՊԱՏՎԱԾ",
//       "ՊՌԵՍԳՐԱՆԻՏ",
//       "ԳԵՂԵՑԻԿ ՏԵՍԱՐԱՆ",
//       "ԱՆՎՏԱՆԳՈՒԹՅԱՆ ՀԱՄԱԿԱՐԳ",
//       "ԽԱՂԱՀՐԱՊԱՐԱԿ",
//       "ԵՐԿԿՈՂՄԱՆԻ ԴԻՐՔ",
//       "ՇՈԳԵԲԱՂՆԻՔ",
//       "ԼՈՋԱ",
//       "ԽՈՐԴԱՆՈՑ",
//       "ԶԳԵՍՏԱՊԱՀԱՐԱՆ",
//       "ԼՎԱՑՔԱՏՈՒՆ",
//       "ԶԲՈՍԱՅԳԻ",
//       "ԱՌԱՋԻՆ ԳԻԾ",
//       "ՄԻՋԲԱԿԱՅԻՆ ՇԵՆՔ",
//       "ԿԱՆԳԱՌԻ ՄՈՏ",
//       "ԱՐԵՎԿՈՂՄ",
//       "ՏԱՔԱՑՎՈՂ ՀԱՏԱԿ",
//       "ԴԱՐՊԱՍ",
//       "ՊԱՐՍՊԱՊԱՏ",
//       "ԵՐԿԿՈՂՄԱՆԻ ՄՈՒՏՔ",
//       "ԵՐԿԱԹՅԱ ԴՈՒՌ",
//       "ԼՈՂԱՎԱԶԱՆ",
//       "ՀԱՏԱԿ",
//       "ԱՌԱՍՏԱՂ",
//       "ԾԱԾԿԵՐ",
//     ],
//   },
//   {
//     name: "juridical",
//     title: "Իրավաբանական",
//     data: ["ՍԵՓԱԿԱՆԱՏԵՐ", "ՍԵՓԱԿԱՆԱՏԻՐՈՁ ՀԵՌԱԽՈՍԱՀԱՄԱՐ"],
//   },
//   {
//     name: "information",
//     title: "ԻՆՖՈՐՄԱՑԻԱ",
//     data: ["ԻՆՖՈՐՄԱՑԻԱ"],
//   },
//   {
//     name: "specialists",
//     title: "Կից Մասնագետներ",
//     data: ["ԳՈՐԾԱԿԱԼ", "ՄԵՆԵՋԵՐ"],
//   },
// ];


