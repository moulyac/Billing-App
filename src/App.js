import 'bootstrap/dist/css/bootstrap.min.css'
import React,{ useState, useEffect } from 'react'
import Home from './components/Home'
import { useDispatch } from 'react-redux'
import { stateLogin } from './action/postmethod'
import './components/style.css'
import { asynBillGet } from './action/billsAction'
import { asynProductGet } from './action/productAction'
import { getCustomers } from './action/customerActions'
import { accountGetMethod } from './action/userGetMethod'
import { propTypes } from 'react-bootstrap/esm/Image'

const App=(props)=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        if(localStorage.getItem('token')){
           dispatch(stateLogin(true))
           dispatch(asynBillGet())
           dispatch(asynProductGet())
           dispatch(getCustomers())
           dispatch(accountGetMethod())
        }
    },[])

    return (
         <div>
            <Home/>
        </div>
    )
}

export default App