import React, { useEffect, useState } from 'react'
import { Search } from '../../components/inputs/Search'
import { BtnAdd } from '../../components/buttons/BtnAdd'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getCrmUsers } from '../../../store/slices/crmSlice'
import { crmUsersColumns } from './data'
import { Loader } from '../../../components/loader/Loader'
import './Crm.scss'

const Crm = () => {
    const dispatch = useDispatch()

    const { userLoading, crmUsers } = useSelector((state) => state.crm)

    useEffect(() => {
        dispatch(getCrmUsers())
    }, [dispatch])

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    return (
        <article className='crm'>
            <div className="crm__top">
                <h3>CRM</h3>
                <div className='crm__top-sticky'>
                    <Search
                        value={search}
                        placeholder="Որոնել՝ Հաճախորդ, Գույք, Հեռախոս, Գույքի տիպ, Մասնագետ, Կարգավիճակ"
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                    <BtnAdd onClick={() => navigate('add')} text="Նոր Հաճախորդ" />
                </div>
            </div>

            {userLoading
                ? <Loader />
                : <Table Columns={crmUsersColumns} Data={crmUsers} />}
        </article>
    )
}

export default Crm