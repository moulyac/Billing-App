import axios from '../config/axiosConfig'

//get method
export const asynProductGet = ()=>{
    return(dispatch)=>{
        axios.get(`/api/products`,)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    console.log(result.errors)
                }
                else
                    dispatch(productsgetAction(result))
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
        axios.post(`/api/products`,formData)
            .then((response)=>{
                const data = response.data
                if(data.hasOwnProperty('errors')){
                    console.log(data.errors)
                }
                else
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
        axios.delete(`/api/products/${id}`)
            .then((response)=>{
                const data = response.data
                if(data.hasOwnProperty('errors')){
                    console.log(data.errors)
                }
                else
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
        axios.put(`/api/products/${id}`,product)
            .then((response)=>{
                const data = response.data
                if(data.hasOwnProperty('errors')){
                    console.log(data.errors)
                }
                else
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