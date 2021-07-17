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


// bill post method

export const asynBillPost = (billdata)=>{
    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/bills',billdata,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const data = response.data
            dispatch(billPostAction(data))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const billPostAction = (data)=>{
    return {
        type : 'ADDBILL',
        payload : data
    }
}

export const asynBillDelete = (id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const data = response.data 
            dispatch(billDeleteAction(data))
        })
        .catch((err)=>{
            console.log(err.msg)
        })
    }
}

export const billDeleteAction = (data)=>{
    return{
        type: 'BILLDELETE',
        payload: data
    }
}