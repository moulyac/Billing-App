import axios from 'axios'

export const postMethodRegister = (values)=>{
    return (dispatch)=>{
    axios.post('http://dct-billing-app.herokuapp.com/api/users/register',values)
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


export const postMethodLogin = (formData)=>{
    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login',formData)
            .then((response)=>{
                const result=(response.data)
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                    alert(result.errors)
                }else{
                    console.log(result.token)
                    dispatch(stateLogin(true))
                    localStorage.setItem('token',result.token)
                   // props.history.push('/')
                   // props.handleAuth()
                    alert('successfully logged in' )
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


