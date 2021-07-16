import React, { useState, useEffect } from 'react'
import ProductsList from './productslist'
import ProductForm from './productForm'
import { Button, Modal } from 'react-bootstrap'
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
        <div>
            <h1> Products :</h1>
            <Button variant="primary" onClick={handleShow}>
        add product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductForm handleaddproduct={handleaddproduct}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>  
            { addproduct && <ProductForm handleaddproduct={handleaddproduct}/> }
            <ProductsList />        
        </div>
    )
}

export default Product