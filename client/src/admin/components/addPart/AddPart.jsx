import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { back } from '../../svgs/svgs';
import { capitalize } from '../../../helpers/formatters';
import Discard from '../buttons/Discard';
import Custom from '../buttons/Custom';
import './AddPart.scss';

const AddPart = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let newPath = pathname.split('/')[2]

  return (
    <div className='addpart'>
      <div className='addpart-navigate'>
        <button onClick={() => navigate(-1)}>
          {back.icon}
          <span>Back to All {capitalize(newPath)}</span>
        </button>
        <h3>Add a New {newPath === "users"
          ? capitalize(newPath).slice(0, -1)
          : capitalize(newPath).slice(0, -3) + "y"}
        </h3>
      </div>

      <div className='addpart-btns'>
        <Discard text="Discard" />
        <Custom text={`Add This ${newPath === "users"
          ? capitalize(newPath).slice(0, -1)
          : capitalize(newPath).slice(0, -3) + "y"}`} />
      </div>
    </div>
  )
}

export default AddPart