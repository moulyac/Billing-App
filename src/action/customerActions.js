import axios from 'axios'

export const getCustomers = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{
                headers:{
                    'Authorization':`bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response)=>{
                const result=response.data
                console.log(result)
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
                axios.post(' http://dct-billing-app.herokuapp.com/api/customers',formData,{
                    headers:{
                        'Authorization':`bearer ${localStorage.getItem('token')}`
                    }
                })
                        .then((response)=>{
                            const result=(response.data)
                            if(result.hasOwnProperty('errors')){
                                console.log(result.errors)
                            }
                            else{
                                console.log(result)
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
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${customer._id}`,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const id=response.data._id
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
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,formData,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            dispatch(editCustomerAction(response.data))
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