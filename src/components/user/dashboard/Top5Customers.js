import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Modal, CloseButton } from 'react-bootstrap'
import { customerName, top5customers } from "../../../helperfunction/dashboardfunction"

const Top5Customers = ()=>{
    const [customerbills, setcustomerbills] = useState([])
    const {customers, bills} = useSelector((state)=>state)
    const [show, setShow] = useState(false);
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlecutomerDetails = (customerbills,custdetails)=>{
        const result = [{...custdetails},[...customerbills]]
        //console.log('handle',result)
        setcustomerbills(result)
    }
    
    const topcustomers = top5customers(bills,customers)
    return<div>
        <div class='border'>
            <h4 style={{color:'#FF9CAE'}}>Top Five Customers:</h4>
            <table  class="table">
                <thead>
                    <tr>
                               <th scope="col">#</th>
                               <th scope="col">Customer Name</th>
                               <th scope="col">Frequency</th>
                               <th scope="col">Details</th>
                    </tr>
                </thead>
                       <tbody>
                            { topcustomers.length>0 ?
                                topcustomers.map((t,i)=>{
                                    return <tr>
                                        <td scope="row">{i+1}</td>
                                        <td>{t ?  customerName(t[0].customer,customers).name: ''}</td>
                                        <td>{t && t.length}</td>
                                        <td><button class='btn btn-light' onClick={()=>{
                                            handlecutomerDetails(t,customerName(t[0].customer,customers)) 
                                            handleShow()
                                            }}>view</button></td>
                                    </tr>
                                }):null
                            }
                       </tbody>
            </table>
                   <Modal show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Header>  
                            <Modal.Title>Customer Bills</Modal.Title>
                            
                        </Modal.Header>
                        <Modal.Body> <CustomerBills customerbills={customerbills} /> </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                            {/* <Button variant="primary" onClick={handleClose}>
                            Save Changes
                            </Button> */}
                        </Modal.Footer>
                    </Modal>  
        </div>

    </div>
}
export default Top5Customers

const CustomerBills = ({customerbills})=>{
    //console.log(customerbills)
    return<div>
        <div class='row'>
        <h4 class='col'>{customerbills[0].name}</h4>
        <h4 class='col'>{customerbills[0].mobile}</h4>
        </div>
        

        <div>
            {
                customerbills[1].map((b)=>{
                    console.log(b)
                    return<p>
                        Date: { b.date.split('T')[0] } Items: { b.lineItems.length } Billed Amount: {b.total} 
                    </p>
                })
            }
        </div>
    </div>
}