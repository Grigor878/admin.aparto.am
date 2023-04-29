import React, { useEffect, useState } from "react";
import { Search } from "../../components/inputs/Search";
import { CardTest } from "./components/card/CardTest";
import "./Structure.scss";

const StructureTest = () => {
  const [search, setSearch] = useState("");
  //   const [strInfo, setStrInfo] = useState();

  //   const getStrInfo = async () => {
  //     try {
  //       const { data } = await baseApi.get("/api/getFormStructure");
  //       setStrInfo(data);
  //     } catch (err) {
  //       console.log(`Get Structure Info: ${err.message}`);
  //     }
  //   };
  //   console.log(strInfo); //

  //   useEffect(() => {
  //     getStrInfo();
  //   }, []);

  const test = [
    {
      name: "announcement",
      title: "Հայտարարություն",
      data: [
        "ԳՈՐԾԱՐՔԻ ՏԵՍԱԿ",
        "ԳՈՒՅՔԻ ՏԵՍԱԿ",
        "Հայտարարության վերնագիր",
        "Հայտարարության ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ",
        "Հայտարարության ՏԵՍԱԿ",
        "Ավելացրած հայտ․",
      ],
    },
    {
      name: "buildingDescription",
      title: "Գտնվելու Վայրը",
      data: [
        "ՇԻՆՈՒԹՅԱՆ ՏԻՊ",
        "ՀԱՐԿԱՅՆՈՒԹՅՈՒՆ",
        "ՇԵՆՔԻ ԿԱՌՈՒՑՄԱՆ ՏԱՐԻՆ",
        "ԿՈՂՄՆՈՐՈՇՈՒՄԸ",
        "ՏԱՐԵԿԱՆ ԳՈՒՅՔԱՀԱՐԿ",
        "ԱՄՍԱԿԱՆ ՍՊԱՍԱՐԿՄԱՆ ՎՃԱՐ",
      ],
    },
    {
      name: "houseDescription",
      title: "Շինության Նկարագիր",
      data: [
        "ՄԱԿԵՐԵՍ",
        "ԱՌԱՍՏԱՂԻ ԲԱՐՁՐՈՒԹՅՈՒՆԸ",
        "ՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
        "ՆՆՋԱՍԵՆՅԱԿՆԵՐԻ ՔԱՆԱԿ",
        "ՍԱՆՀԱՆԳՈՒՅՑՆԵՐԻ ՔԱՆԱԿ",
        "ԲԱՑ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
        "ՓԱԿ ՊԱՏՇԳԱՄԲՆԵՐԻ ՔԱՆԱԿ",
        "ՀԱՐԿԸ",
        "ՏԱՆ ՎԻՃԱԿ",
        "ԱՎՏՈԿԱՅԱՆԱՏԵՂԻ",
        "ԽՈՀԱՆՈՑԻ ՏԻՊ",
      ],
    },
    {
      name: "information",
      title: "ԻՆՖՈՐՄԱՑԻԱ",
      data: ["ԻՆՖՈՐՄԱՑԻԱ"],
    },
    {
      name: "juridical",
      title: "Իրավաբանական",
      data: ["ՍԵՓԱԿԱՆԱՏԵՐ", "ՍԵՓԱԿԱՆԱՏԻՐՈՁ ՀԵՌԱԽՈՍԱՀԱՄԱՐ"],
    },
    {
      name: "location",
      title: "Գտնվելու Վայրը",
      data: [
        "Համայնք",
        "Փողոց",
        "ՇԵՆՔ",
        "ՄՈՒՏՔ",
        "ԲՆԱԿԱՐԱՆ",
        "ԻՐԱԿԱՆ ՀԱՍՑԵ",
        "Ավելա․ տող",
        "ավելա տեքստ",
      ],
    },

    {
      name: "mainFacilities",
      title: "Կոմունալ Հարմարություններ",
      data: [
        "ԱՆՀԱՏԱԿԱՆ ՋԵՌՈՒՑՄԱՆ ՀԱՄԱԿԱՐԳ",
        "Կենտրոնացված ջեռուցման համակարգ",
        "Օդորակիչ",
        "ԿԵՆՏՐՈՆԱՑԱԾ ՀՈՎԱՑՄԱՆ ՀԱՄԱԿԱՐԳ",
        "ԷԼԵԿՏՐՈԷՆԵՐԳԻԱ",
        "ԳԱԶ",
      ],
    },
    {
      name: "otherFacilities",
      title: "Այլ Հարմարություններ",
      data: [
        "ԿԱՀՈՒՅՔ",
        "Տեխնիկա",
        "Վերելակ",
        "ՓԱԿ ՏՆՏԵՍԱԿԱՆ ՊԱՏՇԳԱՄԲ",
        "ԵՎՐՈՊԱՏՈՒՀԱՆ",
        "ԼԱՄԻՆԱՏ",
        "ՄԱՆՐԱՀԱՏԱԿ",
        "ՍԱԼԻԿԱՊԱՏՎԱԾ",
        "ՊՌԵՍԳՐԱՆԻՏ",
        "ԳԵՂԵՑԻԿ ՏԵՍԱՐԱՆ",
        "ԱՆՎՏԱՆԳՈՒԹՅԱՆ ՀԱՄԱԿԱՐԳ",
        "ԽԱՂԱՀՐԱՊԱՐԱԿ",
        "ԵՐԿԿՈՂՄԱՆԻ ԴԻՐՔ",
        "ՇՈԳԵԲԱՂՆԻՔ",
        "ԼՈՋԱ",
        "ԽՈՐԴԱՆՈՑ",
        "ԶԳԵՍՏԱՊԱՀԱՐԱՆ",
        "ԼՎԱՑՔԱՏՈՒՆ",
        "ԶԲՈՍԱՅԳԻ",
        "ԱՌԱՋԻՆ ԳԻԾ",
        "ՄԻՋԲԱԿԱՅԻՆ ՇԵՆՔ",
        "ԿԱՆԳԱՌԻ ՄՈՏ",
        "ԱՐԵՎԿՈՂՄ",
        "ՏԱՔԱՑՎՈՂ ՀԱՏԱԿ",
        "ԴԱՐՊԱՍ",
        "ՊԱՐՍՊԱՊԱՏ",
        "ԵՐԿԿՈՂՄԱՆԻ ՄՈՒՏՔ",
        "ԵՐԿԱԹՅԱ ԴՈՒՌ",
        "ԼՈՂԱՎԱԶԱՆ",
        "ՀԱՏԱԿ",
        "ԱՌԱՍՏԱՂ",
        "ԾԱԾԿԵՐ",
      ],
    },
    {
      name: "price",
      title: "Գինը",
      data: [
        "ԸՆԴՀԱՆՈՒՐ ԳԻՆԸ",
        "ԳԻՆԸ 1քմ",
        "ԿԱՆԽԱՎՃԱՐԻ ՉԱՓ",
        "ՎՃԱՐՄԱՆ ԿԱՐԳԸ",
        "ՆԱԽԸՆՏՐԱԾ ԲԱՆԿԸ",
      ],
    },
    {
      name: "specialists",
      title: "Կից Մասնագետներ",
      data: ["ԳՈՐԾԱԿԱԼ", "ՄԵՆԵՋԵՐ"],
    },
  ];

  return (
    <article className="structure">
      <div className="structure__sticky">
        <h3>Form Structure</h3>
        <Search
          value={search}
          placeholder="Search by field"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {test.map(({ title, name, data }) => {
        return (
          <div className="structure__main" key={name}>
            <CardTest title={title} name={name} data={data} />;
          </div>
        );
      })}
    </article>
  );
};

export default StructureTest;
