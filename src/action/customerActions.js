import axios from '../config/axiosConfig'

export const getCustomers = ()=>{
    return (dispatch)=>{
        axios.get('/api/customers')
            .then((response)=>{
                const result=response.data
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                }
                else
                dispatch(customersList(result))

            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}


export const customersList = (result)=>{
    return {
        type: 'CUSTOMERS_LIST',
        payload: result
    }
}

export const AddCustomerPost = (formData)=>{
    //console.log(formData)
    return (dispatch)=>{
                axios.post('/api/customers',formData)
                        .then((response)=>{
                            const result=(response.data)
                            if(result.hasOwnProperty('errors')){
                                console.log(result.errors)
                            }
                            else{
                               // console.log(result)
                                dispatch(addCustomerAction(result))
                            }
                        })
                        .catch((err)=>{
                            console.log(err.message)
                        })
            }
}

export const addCustomerAction = (result)=>{
    return {
        type:'ADDCUSTOMER',
        payload:result
    }
}

export const deleteCustomer= (customer)=>{
    return (dispatch)=>{
        axios.delete(`/api/customers/${customer._id}`)
            .then((response)=>{
                const id=response.data._id
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                }
                else
                dispatch(deleteCustomerAction(id))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const deleteCustomerAction = (id)=>{
    return{
        type:'DELETE_CUSTOMER',
        payload:id
    }
}

export const editCustomer = (formData,id)=>{
    return(dispatch)=>{
        axios.put(`/api/customers/${id}`,formData)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log(result.errors)
            }
            else
            dispatch(editCustomerAction(result))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const editCustomerAction = (data)=>{
    return{
        type:'EDITCUSTOMER',
        payload:data
    }
}