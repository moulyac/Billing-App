import axios from 'axios'

export const asynBillGet = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills',{
                headers:{
                    'Authorization':`bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response)=>{
                const result=response.data
                //console.log( result)
                dispatch(billsgetAction(result))

            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const billsgetAction = (data)=>{
    return{
        type: 'BILLSLIST',
        payload:data
    }
}