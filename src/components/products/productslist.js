import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynDeleteProduct, asynProductGet } from '../../action/productAction'
import ProductForm from './productForm'

const ProductsList = ()=>{
    const [editProduct, setEditProduct] = useState({})
    const [id, setid] = useState('')
    const [searchText, setsearchText] = useState('')
    const [searchList, setSearchList] = useState([])
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asynProductGet())
    },[])

    const products = useSelector((state)=>{
        return state.products
    })
    const handleDelete = (id)=>{
        dispatch(asynDeleteProduct(id))
    }
    const handleEdit = (product)=>{
        //console.log(product)
        setEditProduct({...product})
        setid(product._id)
    }
    const callbacksetEditproduct = ()=>{
        setEditProduct({})
        setid('')
    }
    const handlesearch = (e)=>{
        const text = e.target.value
        setsearchText(text)
        const result = products.filter((product)=>{
            return product.name.toLowerCase().includes(text.toLowerCase())
        })
        setSearchList(result)
    }

    return(
        <div>
            <h3>Total products : {products.length} </h3>
            <input type='text' placeholder='search' value={searchText} onChange={handlesearch} />
            {
                searchList.length>0? (
                    searchList.map((product)=>{
                        return <div key={product._id}>
                                <li>product name: {product.name}  price:{product.price}</li>
                                <button onClick={()=>handleDelete(product._id)}>Delete</button>
                                <button onClick={()=>handleEdit(product)}>edit</button>
                            </div>
                    })
                ):(
                    products.map((product)=>{
                        return <div key={product._id}>
                                <li>product name: {product.name}  price:{product.price}</li>
                                <button onClick={()=>handleDelete(product._id)}>Delete</button>
                                <button onClick={()=>handleEdit(product)}>edit</button>
                            </div>
                    })
                )
            }
            
            {Object.keys(editProduct).length>0  && <ProductForm callbacksetEditproduct={callbacksetEditproduct} editProduct={editProduct} id={id} />}
        </div>
    )
}

export default ProductsList
