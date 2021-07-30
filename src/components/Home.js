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
import { swalAuthAlert } from '../selector'
import MainPage from './user/dashboard/mainpage'
import PrivateRoute from '../helpers/PrivateRoute'

const Home = (props)=>{
    const login = useSelector((state)=>{
        return state.userLogin
    })
    const dispatch = useDispatch()
    
    const logoStyle ={
        fontSize: '30px',
        padding:'10px',
        //color:'#ff7600e8',
        //fontFamily: 'fantasy'
                    
    }

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
                            <h1 class='text-primary' style={logoStyle}>ProcessPro</h1>
                        </div>
                        {/* <div class='col' >
                        
                            <ul  class="nav  justify-content-end" >
                                
                                <li class="nav-item"><Link class="nav-link" to='/login'>SignIn</Link></li>
                                <li class="nav-item"><Link class="nav-link" to='/register'> SignUp</Link></li> 
                            </ul>
                        </div> */}
                 
                    </div> 
                    <div>
 
                        {/* <Route path='/' component={Homepage} exact={true}/> */}
                        <Route path='/' component={Login} exact={true} />
                        <Route path='/register' component={Register} exact={true}/>
                       
                    </div>

                </div> 
            }
            {
                login &&
                <div>

                    <div class='row align-items-center d-flex justify-content-between px-2' style={{background: 'linear-gradient(to right, #ee9ca7, #ffdde1)'}}>
                        <div class='col-3'>
                            <h1 style={{fontSize:'2rem', padding:'2px'}}><Link to='/dashboard' style={{color:'black', textDecoration:'none'}}>ProcessPro</Link></h1>
                        </div> 
                        <div class='col-5 text-end' style={{fontSize:'1rem'}}>

                            
                            
                                <Link style={link}  to='/customer'> Customer</Link>
                                <Link style={link} to='/product'> Product</Link>
                                <Link style={link}  to='/bills'> Bills</Link>
                                <Link style={link} to='/account'>Account</Link>
                                <Link style={link}  onClick={()=>{
                                        localStorage.removeItem('token')
                                        dispatch(stateLogin(false))
                                        props.history.push('/')
                                        swalAuthAlert('Successfully logged out')
                                        window.location.reload()
                                    }}
                                > Logout</Link>
                                
                            
                            
                        </div>
                    </div> 

                    <div class='row container m-4'>

                        <Route path='/dashboard' render={(props)=>{
                            return login? <MainPage {...props} /> : <Login {...props}
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
        // <div>
        //     {!login && <>
        //         <div>
        //             <div class='row'>
                        
        //                 <div class='col'>
        //                     <Link to='/' class='fs-3 ms-4' style={{TextDecoder:'none'}} >ProcessPro</Link>
        //                 </div>
        //                 <div class='col' >
                        
        //                     <ul  class="nav  justify-content-end" >
                                
        //                         <li class="nav-item"><Link class="nav-link" to='/login'>SignIn</Link></li>
        //                         <li class="nav-item"><Link class="nav-link" to='/register'> SignUp</Link></li> 
        //                     </ul>
        //                 </div>
        //             </div> 
            
        //             <div>
        //                 <Route path='/' component={Homepage} exact={true}/>
        //                 <Route path='/login' component={Login} exact={true} />
        //                 <Route path='/register' component={Register} exact={true}/>
        //             </div>
        //         </div> 
        //     </>}
            
        //         <div>{login&&
        //             <div class='row align-items-center d-flex justify-content-between px-2' style={{backgroundColor: 'rgb(197 203 208)'}}>
        //                 <div class='col-3'>
        //                     <h1 style={{fontSize:'4rem'}}><Link to='/dashboard' style={{color:'#ff7600e8', textDecoration:'none'}}>ProcessPro</Link></h1>
        //                 </div> 
        //                 <div class='col-5 text-end' style={{fontSize:'1.5rem'}}>
        //                         <Link style={link}  to='/customer'> Customer</Link>
        //                         <Link style={link} to='/product'> Product</Link>
        //                         <Link style={link}  to='/bills'> Bills</Link>
        //                         <Link style={link} to='/account'>Account</Link>
        //                         <Link style={link}  onClick={()=>{
        //                                 localStorage.removeItem('token')
        //                                 dispatch(stateLogin(false))
        //                                 props.history.push('/')
        //                                 swalAuthAlert('Successfully logged out')
        //                                 window.location.reload()
        //                             }}
        //                         > Logout</Link>
        //                 </div>
                        
        //             </div> }

        //             <div class='row container m-4'>

        //                 <PrivateRoute path='/dashboard' component={MainPage} />

        //                 <PrivateRoute path='/account' component={Account} />
        //                 <PrivateRoute path='/customer' component={Customer} />
        //                 <PrivateRoute path='/product' component={Product} />

        //                 <PrivateRoute path='/bills' component={Bills} />

        //                 <PrivateRoute path={`/bill/:id`} component={ViewBill}/>

        //             </div>            
                                
        //         </div>
            
        // </div>

        
    )
}

export default withRouter(Home)