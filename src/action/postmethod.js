import axios from '../config/axiosConfig'

export const postMethodRegister = (values)=>{
    return (dispatch)=>{
    axios.post('/api/users/register',values)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                    alert(result.errors)
                }
                else{
                    console.log(response.data)
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


export const postMethodLogin = (formData,history)=>{
    return (dispatch)=>{
        axios.post('/api/users/login',formData)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                    alert(result.errors)
                }else{
                    console.log(result.token)
                    dispatch(stateLogin(true))
                    localStorage.setItem('token',result.token)
                    alert('successfully logged in' )
                    window.location.reload()
                    history('/dashboard')
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


