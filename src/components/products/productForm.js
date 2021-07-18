import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asynAddProduct, asynEditProduct } from '../../action/productAction'
import { swal } from '../../selector'

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
        if(name && price){
            if(editProduct && Object.keys(editProduct).length>0){
                dispatch(asynEditProduct(formDate, id))
                callbacksetEditproduct()
            }else{
                dispatch(asynAddProduct(formDate))
                handleaddproduct()
            }
        }
        else{
            swal('name and price are mandatory!!')
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
        <div class='mt-3'>
            <form onSubmit={handlesubmit}>
                <div class="mb-3">
                    <label for="productname" class="form-label">Product Name*</label>
                    <input type="text" class="form-control" id="productname"
                        value={name} 
                        name='name'
                        onChange={hanldeChange}
                    />
                </div>

                <div class="mb-3">
                    <label for="productprice" class="form-label">Product Price*</label>
                    <input type="number" class="form-control" id="productname"
                        value={price}
                        name='price'
                        onChange={hanldeChange}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                
                
            </form>
        </div>
    )
}

export default ProductForm