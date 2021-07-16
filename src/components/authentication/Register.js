import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import {  postMethodRegister, stateRegister } from '../../action/postmethod';
import { useDispatch, useSelector } from 'react-redux';


const Register = (props)=>{

const register = useSelector((state)=>{
    return state.userRegister
})
//console.log(register)

useEffect(()=>{
    if(register){
        props.history.push('/')
        dispatch(stateRegister(false))
    }
},[register])

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: '',
          businessName:'',
          address:''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'password must be greater than 8 characters')
                .required('Required'),
            address:Yup.string(),
            businessName:Yup.string()
        }),
    
        onSubmit: (values, {resetForm}) => {
           // console.log(values)
            dispatch(postMethodRegister(values))
            resetForm({values : ''})
        },
      });

    return (
        <div class="logregpage">
        <div class="border">
            <h2 style={{textAlign:'center'}}>Register form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div class='mt-5'>
                <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control is-valid" id="username" 
                        placeholder='enter username'
                                name='username'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                style={formik.touched.username && formik.errors.username && {borderColor:"red"}}
                                
                            required/>
                    <div>
                            {formik.touched.username && formik.errors.username ? (
                                <small>{formik.errors.username}</small>
                            ) : null}
                        
                    </div>
                </div>

                                                                        {/* <label for="validationServerUsername" class="form-label">Username</label>
                                                        <div class="input-group has-validation">
                                                        <span class="input-group-text" id="inputGroupPrepend3">@</span>
                                                        <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required/>
                                                        <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                            Please choose a username.
                                                        </div>
                                                        </div> */}
                                                                    {/* <div>
                                                                    <label for="validationServer02" class="form-label">Username</label>
                                                                    <input type="text" class="form-control is-valid" id="validationServer02" 
                                                                            type='text'
                                                                            placeholder='enter username'
                                                                            name='username'
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.username}
                                                                            style={formik.touched.username && formik.errors.username && {borderColor:"red"}}
                                                                    required/>   
                                                                        {formik.touched.username && formik.errors.username ? (
                                                                            <small>{formik.errors.username}</small>
                                                                        ) : null}
                                                                    </div> */}
                                                                    
                <div class='mt-3'>
                    <label for="validationServer02" class="form-label">Email</label>

                    <input type="text" class="form-control is-valid" id="validationServer02" 
                       
                        placeholder='enter email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        style={formik.touched.email && formik.errors.email && {borderColor:"red"}}
                    required/> 
                    
                    {formik.touched.email && formik.errors.email ? (
                        <small>{formik.errors.email}</small>
                    ) : null}
                </div>

                <div class='mt-3'>
                    <label for="password" class="form-label">Password</label>

                    <input  class="form-control is-valid" id="password" 
                            type='password'
                            placeholder='enter password'
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            style={formik.touched.password && formik.errors.password && {borderColor:"red"}}      
                    required/>
                        {formik.touched.password && formik.errors.password ? (
                            <small>{formik.errors.password}</small>
                        ) : null}
                </div>
                <div class='mt-3'>
                     <label for="businessname" class="form-label">Business Name</label>

                    <input  class="form-control" id="businessname" 
                            type='text'
                            placeholder='enter businessName'
                            name='businessName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.businessName}
                            style={formik.touched.businessName && formik.errors.businessName && {borderColor:"red"}}      
                    required    />
                        {formik.touched.businessName && formik.errors.businessName ? (
                            <small>{formik.errors.businessName}</small>
                        ) : null}
                </div>

                <div class='mt-3'>
                <label for="address" class="form-label">Address</label>

                <input  class="form-control" id="address" 
                        type='text'
                        placeholder='enter address'
                        name='address'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        style={formik.touched.address && formik.errors.address && {borderColor:"red"}}      
                required   />
                    {formik.touched.address && formik.errors.address ? (
                        <small>{formik.errors.address}</small>
                    ) : null}
                </div>
                
                <input type='submit' class="btn btn-primary mt-3"/>
                <hr/><p style={{textAlign:'center'}}>Have a account?<Link to='/login'>signIn</Link></p>
            </form>
        </div>
        </div>
    )
}

export default Register