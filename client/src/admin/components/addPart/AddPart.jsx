import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { back } from '../../svgs/svgs'
import { capitalize } from '../../../helpers/formatters'
import { BtnDiscard } from '../buttons/BtnDiscard'
import { BtnCustom } from '../buttons/BtnCustom'
import './AddPart.scss'

const AddPart = ({ type }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  let newPath = pathname.split('/')[2]

  return (
    <div className='addpart'>
      <div className='addpart__navigate'>
        <button onClick={() => navigate(-1)}>
          {back.icon}
          <span>Back to All {capitalize(newPath)}</span>
        </button>

        {type === "addUsers" || type === "addProperties"
          ? <h3>Add a New {newPath === "users" ? capitalize(newPath).slice(0, -1) : capitalize(newPath).slice(0, -3) + "y"}
          </h3>
          : <h3>Edit {newPath === "users" ? capitalize(newPath).slice(0, -1) : capitalize(newPath).slice(0, -3) + "y"}
          </h3>
        }
      </div>

      {type === "addUsers" || type === "addProperties"
        ? <div className='addpart__btns'>
          <BtnDiscard text="Discard" />
          <BtnCustom
            // esi menak sra hamar anel form-y
            form="addUserForm"
            text={`Add This ${newPath === "users" ? capitalize(newPath).slice(0, -1) : capitalize(newPath).slice(0, -3) + "y"}`}
          />
        </div>
        : <div className='addpart__btns'>
          <button className='addpart__btns-deactivate'>Deactivate</button>
          <BtnDiscard text="Discard" />
          <BtnCustom
            form="editUserForm"
            text={`Save ${newPath === "users" ? capitalize(newPath).slice(0, -1) : capitalize(newPath).slice(0, -3) + "y"}`}
          />
        </div>
      }
    </div>
  )
}

export default AddPart