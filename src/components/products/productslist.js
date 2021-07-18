import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { asynDeleteProduct, asynProductGet } from '../../action/productAction'
import ProductForm from './productForm'
import Swal from 'sweetalert2'
import { swal } from '../../selector'

const ProductsList = ()=>{
    const [editProduct, setEditProduct] = useState({})
    const [id, setid] = useState('')
    const [searchText, setsearchText] = useState('')
   
    const [selectOption, setSelectOption] = useState('dateadded')

    //console.log(searchList,'search')
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asynProductGet())
    },[])

    const productdata = useSelector((state)=>{
        return state.products
    })
    const [products, setproducts] = useState([])
    

    useEffect(()=>{
        setproducts([...productdata])
    },[productdata])
//console.log(products,'products')
    const handleDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(asynDeleteProduct(id))
                swal('successfully deleted')
            }
        })
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

        const result = productdata.filter((product)=>{
            return product.name.toLowerCase().includes(text.toLowerCase())
        })
        setproducts(result)
        //console.log('serach', result)
    }

    const  handleSelectChange = (e)=>{
      
        const select = e.target.value
        //console.log(select)
        setSelectOption(select)

        if(select === 'dateadded'){
            setproducts([...productdata])
        }
        else if(select === 'productname'){
            const sortedma =products.sort((a,b)=>{
                if (a.name < b.name) { 
                    return -1; 
                } 
                if (a.name > b.name) { 
                    return 1; 
                } 
                return 0; 
            })
            setproducts(sortedma)
        }
        else if(select === 'pricedowntoup'){
            const sortedra = products.sort ((a,b)=>{
                return (a.price - b.price)
            })
            setproducts(sortedra)
        }
        else if(select === 'priceuptodown'){
            const sortedrd = products.sort ((a,b)=>{
                return (b.price - a.price)
            })
            setproducts(sortedrd)
        }
    }

    return(
        <div class='container'>
            
                <div class='row'>
                    <div class='col'>
                        <h1>Products List : {products.length} </h1>
                    </div>
                    <div class='col p-1'>
                        <input type='serach' class="form-control"  placeholder='Search by product name' value={searchText} onChange={handlesearch} />
                    </div>
                    <div class='col'>
                        <div class='row'>
                            <div class='col-3 py-2 px-0 text-end'>
                                <label>Sort By : </label>
                            </div>
                            <div class='col p-1'>
                                <select class="form-select" value={selectOption} onChange={handleSelectChange} >
                                    <option value='dateadded'> Date Added</option>
                                    <option value="priceuptodown">Price - high to low</option>
                                    <option value="pricedowntoup">Price - low to high</option>
                                    <option value="productname">Product Name</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            <div class='row'>
            <div class='col'>
               <div class='container my-5'>
                {
                   
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
                    
                }
                </div>
            </div>

            <div class='col p-5'>
                {Object.keys(editProduct).length>0  && <ProductForm callbacksetEditproduct={callbacksetEditproduct} editProduct={editProduct} id={id} />
                }

            </div>
           
        </div>
        </div>
    )
}

export default ProductsList
