import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountGetMethod } from '../../action/userGetMethod'
import { AiOutlineUser } from 'react-icons/ai'

const Account = (props)=>{
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.user
    })
    console.log(user)

    useEffect(()=>{
        dispatch(accountGetMethod())
    },[])
    return(
        <div>
            <h1>User Info <AiOutlineUser/></h1>
            <div class='container m-4'>
                <h3><>Email</> - {user.email}</h3>
                <h3><>Name</> - {user.username}</h3>
                <h3><>Business Name</> - {user.businessName}</h3>
                <h3><>Address</> - {user.address}</h3>

            </div>
            
        </div>
    )
}
export default Account