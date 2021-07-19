import React, { useState, useEffect } from 'react'
import ProductsList from './productslist'
import ProductForm from './productForm'
import { Button, Modal, CloseButton } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
// import { asynProductGet } from '../../action/productAction'


const Product = ()=>{
    const [addproduct, setaddproduct] = useState(false)
    const [show, setShow] = useState(false);
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(asynProductGet())
    // },[])

    const handleaddproduct = ()=>{
        setaddproduct(!addproduct) 
    }
    return (
        <div class='container'>
            <div class='row'>
              <div class='col'>
                <h1> Products </h1>
              </div>
              <div class='col text-end p-2'>
                <Button variant="primary" onClick={handleShow}>
                  Add product
                </Button>
              </div>
            </div>

            <Modal show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
              <Modal.Header>  
                <Modal.Title>Add Product</Modal.Title>
                
              </Modal.Header>
              <Modal.Body> <ProductForm handleaddproduct={handleaddproduct} /></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>  
            
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
            
            {/* { addproduct && <ProductForm handleaddproduct={handleaddproduct}/> } */}
            <ProductsList />        
        </div>
    )
}

export default Product