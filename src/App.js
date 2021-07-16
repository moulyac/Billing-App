import 'bootstrap/dist/css/bootstrap.min.css'
import React,{ useState, useEffect } from 'react'
import Home from './components/Home'
import { useDispatch } from 'react-redux'
import { stateLogin } from './action/postmethod'
import './components/style.css'

const App=()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        if(localStorage.getItem('token')){
           dispatch(stateLogin(true))
        }
    },[])

    return (
         <div className='container'>

            <Home/>
            
        </div>
    )
}

export default App