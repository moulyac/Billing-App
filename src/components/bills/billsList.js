import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useDispatch, useSelector } from 'react-redux'
import {Link, Route} from 'react-router-dom'
import { asynBillDelete, asynBillGet } from '../../action/billsAction'
import { asynProductGet } from '../../action/productAction'
import { getCustomers } from '../../action/customerActions';
import Swal from 'sweetalert2'
import { swal } from '../../selector'
 
 export const BillsList = ()=>{
    const billdata = useSelector((state)=>{
        return state.bills
    })

    const bills = [...billdata].reverse()


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
        return customer? customer.name : ''
    }
    const handleDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(asynBillDelete(id))
                swal('successfully deleted')
            }
          })
    }
    return <div class='container mt-5'>
        <h2>All Bills - {bills.length} </h2>
        <div class='container mt-3 text-center' style={{overflow:'scroll', height:'350px'}}>
        {
            bills.map((bill)=>{
                return <div key={bill._id}>
                    <li class="row fs-4">
                        <div class='col'>
                            {customername(bill.customer,customers)} 
                        </div>
                        <div class='col'>
                            {bill.date.split('T')[0]}  
                        </div>
                        <div class='col'>
                            <Link to={`/bill/${bill._id}`}>view</Link>
                        </div>
                        <div class='col'>
                            <button class="btn btn-danger btn-sm my-2 mx-3" onClick={ ()=>handleDelete(bill._id)} >Delete</button>
                        </div>
                </li>
                    </div>
            })
        }
       </div> 
    </div>
}

export const ViewBill = (props)=>{
    const dispatch = useDispatch()
    const { id }= props.match.params
    const componentRef = useRef()
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
        dispatch(asynBillGet())
    },[])

    const billid = bills.find((bill)=>{
        return bill._id == id
    })
//console.log(billid)
    const { customer, date, lineItems, total } = billid ? billid : ''

    const customerd = customers.find((cust)=>{
        //console.log(customer)
        return cust._id == customer
    })


    const productd = lineItems && lineItems.map((item)=>{
        const prodd = products.find((p)=>{
            return p._id == item.product
        })
        return {...prodd,quantity:item.quantity,subTotal:item.subTotal}
    })

    const pageStyle = `
    @page {
        margine :  400mm;
    }`;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle
      });
     //console.log(productd)
    
        return <div class='container'>
            {
                customers.length && products.length && bills.length ?
            <div>
            <Link to='/bills' style={{fontFamily:'auto'}}>Back to list</Link>
            <div ref={componentRef} class='p-2'>
                <div class='row'>
                   <div class='col'>
                        <h1> {user.businessName} </h1>
                        <p> {user.address} </p>
                   </div>

                    <div class='col'>
                        <h3>Date : { date && date.split('T')[0]} </h3>
                        <h3>Invoice No: {id} </h3>
                    </div>
                </div>

            <h2>Customer : {customerd? customerd.name: ''}</h2>

            <table class="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th scope="col">product</th>
                    <th scope="col">unit price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">amount</th>
                </tr>
                </thead>
               <tbody>
               {
                    productd.map((p,i)=>{
                        return <tr>
                            <th scope="row">{i+1}</th>
                            <td>{p.name}</td>
                            <td> {p.price} </td>
                            <td> {p.quantity} </td>
                            <td> {p.subTotal} </td>
                        </tr>
                    })
                }
               </tbody>
               
            </table>
            <div class='row'>
                <div class='col text-end'>
                <h3>Grand Total: {total} </h3>
                </div>
            </div>
        </div>
        <div>
            <button onClick={handlePrint}>Print</button>
        </div>
        </div>: null}
        </div>
}