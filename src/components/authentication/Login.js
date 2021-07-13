import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postMethodLogin } from '../../action/postmethod'

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

        dispatch(postMethodLogin(formData))

        if(login){
            props.history.push('/account')
        }
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
    return (
        <div>
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Email address</label>
                    <input
                        
                        type='email'
                        placeholder='enter email'
                        value={email}
                        name='email'
                        onChange={handleChange}
                    />
                </div>
            
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='enter password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                    />
                </div>

                <br/>

                <input  type='submit'/>

            </form>
        </div>
        </div>
    )
}

export default Login