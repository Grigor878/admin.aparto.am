import React from 'react'
import './styles.scss'

export const CrmStatus = ({ status }) => {
    return (
        status === "new-client"
            ? <span className='crmstatus_new'>Նոր հ.</span>
            : status === "contract-show"
                ? <span className='crmstatus_show'>Պայմ-ցուց.</span>
                : status === "pay"
                    ? <span className='crmstatus_pay'>Նախավճար</span>
                    : status === "open"
                        ? <span className='crmstatus_open'>Գործ.բաց.</span>
                        : status === "fail"
                            ? <span className='crmstatus_fail'>Ձախողում</span>
                            : <span className='crmstatus_sucess'>Հաջողված</span>

    )
}
