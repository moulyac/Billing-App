import axios from '../config/axiosConfig'
import { swal } from '../selector'

export const asynBillGet = ()=>{
    return (dispatch)=>{
        axios.get('/api/bills')
            .then((response)=>{
                const result=response.data
                if(result.hasOwnProperty('errors'))
                swal(result.errors)
                else
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
        axios.post('/api/bills',billdata)
        .then((response)=>{
            const data = response.data
            
            if(data.hasOwnProperty('errors'))
                swal(data.message)
            else{
                swal('Bill added successfully:)')
                dispatch(billPostAction(data))
            }
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
        axios.delete(`/api/bills/${id}`)
        .then((response)=>{
            const data = response.data 
            if(data.hasOwnProperty('errors'))
                swal(data.errors)
            else
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