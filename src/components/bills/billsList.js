import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynBillGet } from '../../action/billsAction'
 
const BillsList = ()=>{
    const billsdata = useSelector((state)=>{
        return state.bills
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asynBillGet())
    },[])
    const [bills, setbills] = useState([])
    useEffect(()=>{
        setbills(billsdata)
    },[billsdata])
    return <div>
        <h2>All Bills - {bills.length} </h2>

        {
            bills.map((bills)=>{
                return <li>{}</li>
            })
        }
    </div>
}
export default BillsList