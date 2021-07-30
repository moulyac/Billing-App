import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postMethodLogin } from '../../action/postmethod'
import '../style.css'
import Homepage from '../Homepage'

const Login = (props)=>{
    const imgpath = 'https://uploads-ssl.webflow.com/5e3ce2ec7f6e53c045fe7cfa/603dd39e1da857523f684124_Frame-21.png'
    const [email, setEmail]= useState('dct17user@gmail.com')
    const [password, setPassword]= useState('dct17user123')
    const [serverError, setserverError] = useState('')

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
        const logintodashboardpage = ()=>{
            props.history.push('/dashboard')
        }
        const handleserverError = (err)=>{
            setserverError(err)
        }
        dispatch(postMethodLogin(formData, logintodashboardpage, handleserverError))
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
    return(
    <div class='row'>
        <div class='col'>
            <img src={imgpath} style={{height:'80vh', marginLeft:'3rem'}} alt='image not found' />
        </div>
        <div class='col animate__animated animate__zoomIn'>
            <div  class='logregpage'>
            <div class='border'>
                <h2 style={{ textAlign:'center'}} class='mb-4 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit} class="Form">
                        <div class="mb-3">
                            <label for="inputEmail1" class="form-label">Email address<span className="text-danger">*</span></label>
                            <input type="email" class="form-control" id="inputEmail1"
                                type='email'
                                placeholder='enter email'
                                value={email}
                                name='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword1" class="form-label">Password<span className="text-danger">*</span></label>
                            <input type="password" class="form-control" id="inputPassword1"
                                type='password'
                                placeholder='enter password'
                                value={password}
                                name='password'
                                onChange={handleChange}
                            />
                            <span style={{color:'red'}}>{serverError}</span>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Login</button>
                        <hr/><p style={{textAlign:'center'}} class='pd-1'>Dont have a account?<Link style={{textDecoration:'none'}} to='/register'> Sign up</Link></p>

                    </form>
            </div>
        </div>
        </div>
        </div>)
}

export default Login