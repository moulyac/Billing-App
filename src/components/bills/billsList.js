import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, Route} from 'react-router-dom'
import { asynBillGet } from '../../action/billsAction'
import { asynProductGet } from '../../action/productAction'
import { getCustomers } from '../../action/customerActions';
 
 export const BillsList = ()=>{
    const bills = useSelector((state)=>{
        return state.bills
    })


    const customers = useSelector((state)=>{
        return state.customers
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(asynBillGet())
    },[])
    
    const customername = (cusId,customers )=>{
        //console.log(cusId, customers)
        const customer = customers.find((customer)=>{
            return cusId == customer._id
        })
        //console.log( 'cu ',customer.name)
        return customer.name
    }
    return <div>
        <h2>All Bills - {bills.length} </h2>

        {
            bills.map((bill)=>{
                return <li key={bill._id}>{customername(bill.customer,customers)} &nbsp;
                        date : {bill.date.split('T')[0]} &nbsp; 
                        <Link to={`/bill/${bill._id}`}>view</Link>
                          
                </li>
            })
        }
        
    </div>
}

export const ViewBill = (props)=>{
    const dispatch = useDispatch()
    const { id }= props.match.params
    const bills = useSelector((state)=>{
        return state.bills
    })
    const customers = useSelector((state)=>{
        return state.customers
    })
    const products = useSelector((state)=>{
        return state.products
    })
    const user = useSelector((state)=>{
        return state.user
    })
    useEffect(()=>{
        dispatch(asynProductGet())
        dispatch(getCustomers())
    },[])

    const billid = bills.find((bill)=>{
        return bill._id == id
    })
//console.log(billid)
    const { customer, date, lineItems, total } = billid

    const customerd = customers.find((cust)=>{
        //console.log(customer)
        return cust._id == customer
    })
// console.log('cust',customers)
     //console.log('id',customerd)

     const productd = lineItems.map((item)=>{
         const prodd = products.find((p)=>{
             return p._id == item.product
         })
         return {...prodd,quantity:item.quantity,subTotal:item.subTotal}
     })

     //console.log(productd)
    
        return <div>
            <h1> {user.businessName} </h1>
            <p> {user.address} </p>

            <h3>Date : {date.split('T')[0]} </h3>
            <h3>Invoice No: </h3>

            <h2>Customer : {customerd.name}</h2>

            <table>
                <tr>
                    <th>product</th>
                    <th>unit price</th>
                    <th>quantity</th>
                    <th>amount</th>
                </tr>
                {
                    productd.map((p)=>{
                        return <tr>
                            <td>{p.name}</td>
                            <td> {p.price} </td>
                            <td> {p.quantity} </td>
                            <td> {p.subTotal} </td>
                        </tr>
                    })
                }
            </table>
            <h3>Grand Total: {total} </h3>
        </div>
}