import React, { useState, useEffect } from 'react'
import ProductsList from './productslist'
import ProductForm from './productForm'
// import { useDispatch } from 'react-redux'
// import { asynProductGet } from '../../action/productAction'


const Product = ()=>{
    const [addproduct, setaddproduct] = useState(false)

    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(asynProductGet())
    // },[])

    const handleaddproduct = ()=>{
        setaddproduct(!addproduct)
    }
    return (
        <div>
            <h1> Products :</h1>
            <button onClick={handleaddproduct}>add product</button>
            { addproduct && <ProductForm handleaddproduct={handleaddproduct}/> }
            <ProductsList />
    
        </div>
    )
}

export default Product