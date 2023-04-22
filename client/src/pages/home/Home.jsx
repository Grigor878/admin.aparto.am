import React from 'react'
// import Map from '../../components/map/Map'
// import MapSelect from '../../components/map/MapSelect'
// import MapSearch from '../../components/map/MapSearch'
// import MapDragable from '../../components/map/MapDragable'
import './Home.scss'

const Home = () => {

    // x++ (arjeqy cuc tal gumarel mek)
    // ++x (gumarel mek arjeqy cuc tal)

    // let a = 0;
    // console.log(a++);//0
    // console.log(++a);//2
    // console.log(a--);//2
    // console.log(--a);//0

    // let b = 0;
    // console.log(b++);//0
    // console.log(++b);//2
    // console.log(--b);//1
    // console.log(b--);//1

    // let obj = {
    //     a: 1,
    //     b: "2",
    //     c: {
    //         d: "3"
    //     }
    // }

    // let deepCopy = JSON.parse(JSON.stringify(obj)) // deep copy
    // let shallowCopy1 = obj // shallow copy
    // let shallowCopy2 = { ...obj } // shallow copy
    // let shallowCopy3 = Object.assign(obj)// shallow copy
    // obj.b = 2
    // obj.c.d = 3

    // console.log("original", obj);
    // console.log("deep copy", deepCopy); // voj mi ban chi poxi
    // console.log("shallow copy", shallowCopy1); // b-n u d-n kpoxi
    // console.log("shallow copy spred", shallowCopy2); // b-n chi poxi d-n kpoxi
    // console.log("shallow copy assign", shallowCopy3); // b-n u d-n kpoxi

    // function polindrom(str) {
    //     return str === str.split("").reverse().join('')
    // }
    // console.log(polindrom('anna'));

    // function factorial(num) {
    //     if (num === 0) {
    //         return 1
    //     } else {
    //         return num * factorial(num - 1)
    //     }
    // }
    // console.log(factorial(4)) //24

    return (
        <section>
            <div className="container">
                <h1>Home</h1>
                {/* <br />
                <br />
                <h3>Custom map</h3>
                <Map />
                <br />
                <br />
                <h3>Map with search</h3>
                <MapSearch />
                <br />
                <br />
                <h3>Map with select</h3>
                <MapSelect />
                <br />
                <br />
                <h3>Draggable Map</h3>
                <MapDragable/> */}
            </div>
        </section>
    )
}

export default Home