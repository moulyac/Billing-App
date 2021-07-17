import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { asynDeleteProduct, asynProductGet } from '../../action/productAction'
import ProductForm from './productForm'

const ProductsList = ()=>{
    const [editProduct, setEditProduct] = useState({})
    const [id, setid] = useState('')
    const [searchText, setsearchText] = useState('')
    const [searchList, setSearchList] = useState([])
    // const [alert, setalert] =useState(false)
    // const handlealert = ()=>{
    //     setalert(!alert)
    // }
    
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
        <div class='container'>
            
                <div class='row'>
                    <div class='col'>
                        <h1>Products List : {products.length} </h1>
                    </div>
                    <div class='col p-2'>
                        <input type='search' className='searchbar' placeholder='Search by product name' value={searchText} onChange={handlesearch} />
                    </div>
                </div>

            <div class='row'>
            <div class='col'>
               <div class='container my-5'>
                {
                    searchList.length>0? (
                        searchList.map((product)=>{
                            return <div key={product._id}>
                                    <li class="row fs-4">
                                        <div class='col'>
                                        {product.name} - {product.price}Rs
                                        </div>
                                        <div class='col-3'>
                                        <button class="btn btn-danger btn-sm m-2" onClick={()=>handleDelete(product._id)}>Delete</button>
                                         </div>  
                                         <div class='col-1'> 
                                        <button class="btn btn-dark btn-sm m-2" onClick={()=>handleEdit(product)}>edit</button>
                                        </div>
                                    </li>
                                </div>
                        })
                    ):(
                        products.map((product)=>{
                            return <div key={product._id}>
                                    <li class="row fs-4">
                                        <div class='col'>
                                        {product.name} - {product.price}Rs
                                        </div>
                                        <div class='col-3'>
                                        <button class="btn btn-danger btn-sm m-2" onClick={()=>handleDelete(product._id)}>Delete</button>
                                         </div>  
                                         <div class='col-1'> 
                                        <button class="btn btn-dark btn-sm m-2" onClick={()=>handleEdit(product)}>edit</button>
                                        </div>
                                    </li>
                                </div>
                        })
                    )
                }
                </div>
            </div>

            <div class='col p-5'>
                {Object.keys(editProduct).length>0  && <ProductForm callbacksetEditproduct={callbacksetEditproduct} editProduct={editProduct} id={id} />
                }
                {/* { alert &&
                    <div>
                     <div class="alert alert-success" role="alert">
                         <p>the product is been added to the list!!</p>
                     </div>
                     {
                        setTimeout(() => {
                                handlealert()
                        }, 10000)
                     }
                    </div>
                   
                } */}
            </div>
           
        </div>
        </div>
    )
}

export default ProductsList
