import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postMethodLogin } from '../../action/postmethod'
import '../style.css'
import Homepage from '../Homepage'

const Login = (props)=>{
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const login = useSelector((state)=>{
        return state.userLogin
    })

    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()

        const formData = {
            email: email,
            password: password
        }
        //console.log(formData)

        dispatch(postMethodLogin(formData,props.history.push))
    }

    const handleChange = (e)=>{
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }
    //console.log(login)
    return<div class='row'>
        <div class='col'>
            <Homepage/>
        </div>
        <div class='col'>
    <div  class='logregpage'>
            <div class='border'>
                <h2 style={{ textAlign:'center'}} class='mb-5'>Login Form</h2>
                    <form onSubmit={handleSubmit} class="Form">
                        <div class="mb-3">
                            <label for="inputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="inputEmail1"
                                type='email'
                                placeholder='enter email'
                                value={email}
                                name='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword1"
                                type='password'
                                placeholder='enter password'
                                value={password}
                                name='password'
                                onChange={handleChange}
                            />
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Login</button>
                        <hr/><p style={{textAlign:'center'}} class='pd-1'>Dont have a account?<Link to='/register'>signUp</Link></p>

                    </form>
            </div>
        </div>
        </div>
        </div>
}

export default Login