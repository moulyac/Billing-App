import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asynAddProduct, asynEditProduct } from '../../action/productAction'

const ProductForm = ({handleaddproduct, editProduct, callbacksetEditproduct, id})=>{
    const [name, setname] = useState(editProduct? editProduct.name :  '')
    const [price, setprice] = useState(editProduct? editProduct.price : 0)

    const dispatch = useDispatch()

    const handlesubmit = (e)=>{
        e.preventDefault()
        const formDate = {
            name: name,
            price: price
        }
        //console.log(formDate)
        if(editProduct && Object.keys(editProduct).length>0){
            dispatch(asynEditProduct(formDate, id))
            callbacksetEditproduct()
        }else{
            dispatch(asynAddProduct(formDate))
            handleaddproduct()
        }
        setname('')
        setprice(0)
        
    }

    const hanldeChange = (e)=>{
        const text = e.target.value

        if(e.target.name === 'name'){
            setname(text)
        }else if(e.target.name === 'price'){
            setprice(text)
        }
    }
    return(
        <div>
            <form onSubmit={handlesubmit}>
                <input type='text' name='name' value={name} onChange={hanldeChange} />
                <input type='number' name='price' value={price} onChange={hanldeChange} />  
                <input type='submit'/>              
            </form>
        </div>
    )
}

export default ProductForm