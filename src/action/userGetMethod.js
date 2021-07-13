import axios from 'axios'

export const accountGetMethod = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account',{
                headers:{
                    'Authorization':`bearer ${localStorage.getItem('token')}`
                }
        })
            .then((response)=>{
                const result=response.data
                console.log(result)
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


