import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountGetMethod } from '../../action/userGetMethod'

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
            <h1>User Account</h1>
            <div>
                <h3><>Email</> - {user.email}</h3>
                <h3><>UserName</> - {user.username}</h3>
                <h3><>businessName</> - {user.businessName}</h3>
                <h3><>address</> - {user.address}</h3>

            </div>
            
        </div>
    )
}
export default Account