import React from 'react'
import BillsList from './billsList'
import BillsForm from './billsForm'

const Bills = ()=>{
    return (
        <div>
            <h1>Bills</h1>
            
            <BillsList/>

            <BillsForm/>
        </div>
    )
}
export default Bills