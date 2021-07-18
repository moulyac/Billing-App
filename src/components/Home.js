import React, { useEffect } from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import Login from './authentication/Login'
import Register from './authentication/Register'
import Homepage from './Homepage'
import { useDispatch, useSelector } from 'react-redux'
import Account from './user/Account'
import { stateLogin } from '../action/postmethod'
import Customer from './Customer'
import Product from './products/products'
import Bills from './bills/bills'
import {ViewBill} from './bills/billsList'
import Dashboard from './user/Dashboard'

const Home = (props)=>{
    const login = useSelector((state)=>{
        return state.userLogin
    })
    const dispatch = useDispatch()
   

    const link = {
        textDecoration: 'none',
        color:'black',
        padding:'0px 5px'
    }
    return (
        <div>
            {
                !login&&
                <div>
                    
                    <div class='row'>
                    
                        <div class='col'>
                            <Link to='/' class='fs-3 ms-4' style={{TextDecoder:'none'}} >ProcessPro</Link>
                        </div>
                        <div class='col' >
                        
                            <ul  class="nav  justify-content-end" >
                                
                                <li class="nav-item"><Link class="nav-link" to='/login'>SignIn</Link></li>
                                <li class="nav-item"><Link class="nav-link" to='/register'> SignUp</Link></li> 
                            </ul>
                        </div>
                
                    </div> 
                    <div>
                        <Route path='/' component={Homepage} exact={true}/>
                        <Route path='/login' component={Login} exact={true} />
                        <Route path='/register' component={Register} exact={true}/>
                    </div>

                </div> 
            }
            {
                login &&
                <div>

                    <div class='row align-items-center d-flex justify-content-between px-2' style={{backgroundColor: '#e3f2fd'}}>
                        <div class='col-8'>
                            <h1 class="fs-1"><Link to='/dashboard' style={{color:'#ff7600e8', textDecoration:'none'}}>ProcessPro</Link></h1>
                        </div> 
                        <div class='col-4 text-end'>

                            
                            
                                <Link style={link}  to='/customer'> Customer</Link>
                                <Link style={link} to='/product'> Product</Link>
                                <Link style={link}  to='/bills'> Bills</Link>
                                <Link style={link} to='/account'>Account</Link>
                                <Link style={link}  onClick={()=>{
                                        localStorage.removeItem('token')
                                        dispatch(stateLogin(false))
                                        props.history.push('/')
                                        alert('successfully logged out')
                                        window.location.reload()
                                    }}
                                > Logout</Link>
                                
                            
                            
                        </div>
                    </div> 
                    
                    
                        

                    <div class='row container m-4'>

                        <Route path='/dashboard' render={(props)=>{
                            return login? <Dashboard {...props} /> : <Login {...props}
                            />
                        }}/>

                        <Route path='/account' render={(props)=>{
                            return login? <Account {...props} /> : <Login {...props}
                            />
                        }}/>
                        <Route path='/customer' render={(props)=>{
                            return login? <Customer {...props} /> : <Login {...props}
                            />
                        }}/>
                        <Route path='/product' render={(props)=>{
                            return login? <Product {...props} /> : <Login {...props}
                            />
                        }}/>

                        <Route path='/bills' render={(props)=>{
                            return login? <Bills {...props} /> : <Login {...props}
                            />
                        }}/>

                        <Route path={`/bill/:id`} component={ViewBill}/>

                    </div>            
                                
                </div>
            }
        </div>

        
    )
}

export default withRouter(Home)