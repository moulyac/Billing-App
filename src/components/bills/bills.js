import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {BillsList} from './billsList'
import BillsForm from './billsForm'
import {Button, Modal, ModalFooter} from  'react-bootstrap'
import { useSelector } from 'react-redux'

const Bills = ()=>{
    const bills = useSelector((state)=>{
        return state.bills
    })
    

    const id=bills.length>0? bills[bills.length-1]._id : ''
    
    const [show, setShow] = useState(false);

    return (
        <div>
            <div class='row'>
                <div class='col'>
                    <h1>Bills</h1>
                </div>
                <div class='col text-end'>
                    <div class='p-2'>
                    <Button   onClick={() => setShow(true)}>
                        Add bill
                    </Button>
                    </div>
                    
                </div>
            </div>
            
            <Modal size='lg' show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header >
                <Modal.Title>Bill Form</Modal.Title>
                </Modal.Header>
                <Modal.Body ><BillsForm/></Modal.Body>
                <ModalFooter><button class="btn btn-info" onClick={() => setShow(false)}><Link to={`/bill/${id}`} style={{color:'white', textDecoration:'none'}}>Bill</Link></button></ModalFooter>
            </Modal>
            
            <BillsList/>

            
        </div>
    )
}
export default Bills