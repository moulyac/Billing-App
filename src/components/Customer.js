import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCustomerPost, deleteCustomer, getCustomers, editCustomer } from '../action/customerActions'

const Customer =()=>{
    const [addCustomer, setCustomer] = useState({})
    const [editid, setid] =useState('')
    const [editcustomer, setedit] = useState({})
    const [searchText, setsearchText] = useState('')
    const [searchList, setSearchList] = useState([])


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
        dispatch(deleteCustomer(customer))
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
        <div>
            <h1>Customer :</h1>
            <input type='text' placeholder='search' value={searchText} onChange={handlesearch} />

            <button onClick={handleAddCustomers}>Add Customer</button>
                {
                   Object.keys(addCustomer).length>0 && <AddCustomer customerformData={customerformData}/>
                }

            <h1>Customers List - {customers.length}</h1>

            {
                searchList.length>0? (
                    searchList.map((customer)=>{
                        return(
                            <div key={customer._id}>
                                <li>{customer.name} - {customer.mobile}</li> 
                                <button onClick={()=>handleDelete(customer)}>delete</button>
                                <button onClick={()=>{handleEdit(customer)}}>edit</button>
                            </div>
                        )
                    })
                ):(
                    customers.map((customer)=>{
                        return(
                            <div key={customer._id}>
                                <li>{customer.name} - {customer.mobile}</li> 
                                <button onClick={()=>handleDelete(customer)}>delete</button>
                                <button onClick={()=>{handleEdit(customer)}}>edit</button>
                            </div>
                        )
                    })
                )
            }

            {
                Object.keys(editcustomer).length>0 && <AddCustomer editcustomer={editcustomer} customerformData={customerformData} />
            }
        </div>
    )
}

export default Customer


const AddCustomer = ({ customerformData, editcustomer})=>{
    const [email, setemail] = useState(editcustomer? editcustomer.email : '')
    const [name, setname] = useState(editcustomer? editcustomer.name : '')
    const [mobile, setmobile] =useState(editcustomer? editcustomer.mobile : '')

    const handleChange = (e)=>{
        const text = e.target.value
        
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
        const formData = {
            name:name,
            mobile:mobile,
            email:email
        }
        customerformData(formData)
        setname('')
        setemail('')
        setmobile('')
    }
    
    return (
        <div>
            <form onSubmit={hanldeSubmit}>
                <input type='text' placeholder='name' name='name' value={name} onChange={handleChange} /><br/>
                <input type='text' placeholder='mobile' name='mobile' value={mobile} onChange={handleChange} /><br/>
                <input type='text' placeholder='email' name='email' value={email} onChange={handleChange} /><br/>
                <input type='submit' value='add'/>
            </form>
        </div>
    )
}