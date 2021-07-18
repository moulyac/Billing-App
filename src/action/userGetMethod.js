import axios from '../config/axiosConfig'

export const accountGetMethod = ()=>{
    return (dispatch)=>{
        axios.get('/api/users/account')
            .then((response)=>{
               
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log(result.errors)
            }
            else
            dispatch(userAccount(result))

            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const userAccount = (result)=>{
    return {
        type : 'ACCOUNT_DETAILS',
        payload : result
    }
}


