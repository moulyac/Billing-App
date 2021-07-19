import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { AddCustomerPost, deleteCustomer, getCustomers, editCustomer } from '../action/customerActions'
import Swal from 'sweetalert2'
import { swal } from '../selector'

const Customer =()=>{
    const [addCustomer, setCustomer] = useState({})
    const [editid, setid] =useState('')
    const [editcustomer, setedit] = useState({})
    const [searchText, setsearchText] = useState('')
    const [searchList, setSearchList] = useState([])

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCustomers())
    },[])

    const customers = useSelector((state)=>{
        return state.customers
    })

    const handleAddCustomers = ()=>{
        setCustomer({name:'', mobile:'', email:''})
    }

    const customerformData = (formData)=>{
        if(editid.length==0)
            dispatch(AddCustomerPost(formData))
        else{
            dispatch(editCustomer(formData,editid))
        }
        setCustomer({})
        setid('')
        setedit({})
    }
    const handleDelete = (customer)=>{
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
                dispatch(deleteCustomer(customer))
                swal('successfully deleted')
            }
          })
    }
    const handleEdit = (customer)=>{
        //console.log(customer)
        setid(customer._id)
        setedit(customer)
    }
    const handlesearch = (e)=>{
        const text = e.target.value
        setsearchText(text)
        const result = customers.filter((customer)=>{
            return customer.mobile.includes(text)
        })
        setSearchList(result)
    }
    return(
        <div class='container'>
            <div class='row'>
            <div class='col'>
            <h1>Customer </h1>
            </div>
            <div class='col text-end p-2'>
            <Button variant="primary" onClick={handleShow}>
                Add Customer
            </Button>

            </div>

            </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header >
            <Modal.Title>Add Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <AddCustomer customerformData={customerformData} buttonName='Add'/>
            </Modal.Body>
            <Modal.Footer>
            <button  class="btn btn-dark" onClick={handleClose}>
                Close
            </button>
            </Modal.Footer>
        </Modal>

            <div class='container mt-5'>
                
                    <div class='row'>
                        <div class='col'>
                            <h2>Customers List - {customers.length}</h2>
                        </div>
                        <div class='col-5 p-2'>
                            <input type='search' class="form-control"   placeholder='Search by mobile number' value={searchText} onChange={handlesearch} />
                        </div>
                    </div>
                <div class='row'>   
                    <div class='col'>
                    <div class='container my-2'>
                    {
                        searchList.length>0? (
                            searchList.map((customer)=>{
                                return(
                                    <div key={customer._id}>
                                        <li class=" row fs-4">
                                            <div class='col' >{customer.name} - {customer.mobile}</div>
                                            <div class='col-3'>
                                            <button class="btn btn-danger btn-sm m-2" onClick={()=>handleDelete(customer)}>delete</button>
                                            </div>
                                            <div class='col-1'>
                                            <button class="btn btn-dark btn-sm m-2" onClick={()=>{handleEdit(customer)}}>edit</button>
                                            </div>
                                        </li> 
                                    </div>
                                )
                            })
                        ):(
                            customers.map((customer)=>{
                                return(
                                    <div key={customer._id}>
                                        <li class=" row fs-4">
                                            <div class='col' >{customer.name} - {customer.mobile}</div>
                                            <div class='col-3'>
                                            <button class="btn btn-danger btn-sm m-2" onClick={()=>handleDelete(customer)}>delete</button>
                                            </div>
                                            <div class='col-1'>
                                            <button class="btn btn-dark btn-sm m-2" onClick={()=>{handleEdit(customer)}}>edit</button>
                                            </div>
                                        </li> 
                                    </div> 
                                )
                            })
                        )
                    }
                    </div>
                </div>
                <div class='col p-4'>
                    {
                        Object.keys(editcustomer).length>0 && <AddCustomer editcustomer={editcustomer} buttonName='Update' customerformData={customerformData} />
                    }
                </div>
            </div>   
            </div>
        </div>
    )
}

export default Customer


const AddCustomer = ({ customerformData, editcustomer, buttonName})=>{
    const [email, setemail] = useState(editcustomer? editcustomer.email : '')
    const [name, setname] = useState(editcustomer? editcustomer.name : '')
    const [mobile, setmobile] =useState(editcustomer? editcustomer.mobile : '')
//console.log(editCustomer)
    const handleChange = (e)=>{
        const text = e.target.value
        //console.log(text)
        if(e.target.name === 'name'){
            setname(text)
        }else if(e.target.name  === 'mobile'){
            setmobile(text)
        }else if(e.target.name  === 'email'){
            setemail(text)
        }
    }
    const hanldeSubmit=(e)=>{
        e.preventDefault()
        if(name && mobile.length==10){
        const formData = {
            name:name,
            mobile:mobile,
            email:email
        }
        customerformData(formData)
       // alert(`The customer details have been ${buttonName}ed successfully:)`)
        setname('')
        setemail('')
        setmobile('')
        }else{
            swal('Customer name and mobile number are mandatory and mobile number should be 10digits!!')
        }
    }
    
    return (
        <div>
            <form onSubmit={hanldeSubmit}>

                <div class="mb-3">
                    <label for="customername" class="form-label">Customer Name*</label>
                    <input type="text" class="form-control" id="customername"
                        value={name} 
                        name='name'
                        onChange={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label for="mobile" class="form-label">Mobile Number*</label>
                    <input type="text" class="form-control" id="mobile"
                        value={mobile} 
                        name='mobile'
                        onChange={handleChange}
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email"
                        value={email} 
                        name='email' 
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" class="btn btn-primary">{buttonName}</button>

            </form>
        </div>
    )
}