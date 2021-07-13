import axios from 'axios'

//get method
export const asynProductGet = ()=>{
    return(dispatch)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/products`,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response)=>{
                //console.log(response.data)
                dispatch(productsgetAction(response.data))
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const productsgetAction = (data)=>{
    //console.log(data,'data in action')
    return{
        type: 'PRODUCTS_LIST',
        payload: data
    }
}

//add producr post
export const asynAddProduct = (formData)=>{
    return (dispatch)=>{
        axios.post(`http://dct-billing-app.herokuapp.com/api/products`,formData,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response)=>{
                const data = response.data
                //console.log(data)
                dispatch(addProductAction(data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const addProductAction = (data)=>{
    return{
        type: 'ADDPRODUCT',
        payload: data
    }
}


//delete a product
export const asynDeleteProduct = (id)=>{
    return(dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response)=>{
                const data = response.data
                dispatch(deleteProductAction(data))
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const deleteProductAction = (data)=>{
    return{
        type:'DELETEPRODUCT',
        payload:data
    }
}


export const asynEditProduct = (product, id)=>{
    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,product,{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response)=>{
                const data = response.data
                console.log(data)
                dispatch(editeProductAction(data))
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const editeProductAction = (data)=>{
    return {
        type:'EDITPRODUCT',
        payload:data
    }
}