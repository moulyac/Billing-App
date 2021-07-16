import React from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import Login from './authentication/Login'
import Register from './authentication/Register'
import { useDispatch, useSelector } from 'react-redux'
import Account from './user/Account'
import { stateLogin } from '../action/postmethod'
import Customer from './Customer'
import Product from './products/products'
import Bills from './bills/bills'
import {ViewBill} from './bills/billsList'

const Home = (props)=>{
    const login = useSelector((state)=>{
        return state.userLogin
    })
    const dispatch = useDispatch()
    return (
        <div>
            {
                !login&&
                <>
                    <div>
                    <Link to='/' >Billing App</Link>
                    
                    <div >
                     
                        <>
                            <Link to='/login'>SignIn</Link> / 
                            <Link to='/register'> SignUp</Link>
                            <Route path='/login' component={Login} exact={true} />
                            <Route path='/register' component={Register} exact={true}/>
                        </>
                        
                    </div>
            </div>
                </>
            }
            

            {
                login &&
                <>
                    <div>
                        <h1 >Billing App</h1>
                    </div>
                    <div>
                        <Link to='/account'>Account</Link> |
                        <Link onClick={()=>{
                                localStorage.removeItem('token')
                                dispatch(stateLogin(false))
                                props.history.push('/')
                                alert('successfully logged out')
                            }}
                        > Logout</Link> <br/>
                        <Link to='/customer'> customer</Link> | 
                        <Link to='/product'> Product</Link> |
                        <Link to='/bills'> Bills</Link> 
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
                </>
            }
        </div>

        
    )
}

export default withRouter(Home)