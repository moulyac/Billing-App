import axios from '../config/axiosConfig'
import { swal, swalAuthAlert } from '../selector'

export const postMethodRegister = (values)=>{
    return (dispatch)=>{
    axios.post('/api/users/register',values)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                    swal(result.errors)
                }
                else{
                    swalAuthAlert('Successfully registered')
                    dispatch(stateRegister(true))
                }
            })
            .catch((err)=>{
                console.log(err.message)
            })
        }   
}

export const stateRegister = (b)=>{
    return{
        type: 'REGISTER',
        payload: b
    }
}


export const postMethodLogin = (formData,logintodashboardpage,handleserverError)=>{
    return (dispatch)=>{
        axios.post('/api/users/login',formData)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                    handleserverError(result.errors)
                }else{
                    //console.log(result.token)
                    dispatch(stateLogin(true))
                    logintodashboardpage()
                    swalAuthAlert('Successfully logged in' )
                    localStorage.setItem('token',result.token)
                    window.location.reload()
                }
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const stateLogin = (b)=>{
    return{
        type : 'LOGIN',
        payload : b
    }
}


