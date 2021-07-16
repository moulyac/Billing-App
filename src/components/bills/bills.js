import React, {useState} from 'react'
import {BillsList} from './billsList'
import BillsForm from './billsForm'
import {Button, Modal} from  'react-bootstrap'

const Bills = ()=>{
    
    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>Bills</h1>

            <Button  onClick={() => setShow(true)}>
                Add bill
            </Button>
            
            <Modal size='lg' show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body ><BillsForm/></Modal.Body>
            </Modal>
            
            <BillsList/>

            
        </div>
    )
}
export default Bills