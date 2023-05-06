import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStructureInfo } from "../../../store/slices/structureSlice"
import { Loader } from "../../../components/loader/Loader"
import { Search } from "../../components/inputs/Search"
import { Card } from "./components/card/Card"
import "./Structure.scss"

const Structure = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState("")

  const { info, added, removed } = useSelector((state) => state.structure)
  console.log(info)//

  const center = info?.slice(0, 7)
  const right = info?.slice(7, 10)

  useEffect(() => {
    dispatch(getStructureInfo())
  }, [dispatch, added, removed])

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

      {!info
        ? <Loader />
        : <div className="structure__main">
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
      }
    </article>
  );
};

export default Structure


