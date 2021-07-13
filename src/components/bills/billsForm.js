import React, { useEffect, useState } from 'react'
import { Hint } from 'react-autocomplete-hint';
import { useSelector, useDispatch } from 'react-redux';
import { asynProductGet } from '../../action/productAction'
import { getCustomers } from '../../action/customerActions';

const BillsForm = ()=>{
    const [mobile, setmobile] = useState('')
    const [name, setname] = useState('')

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asynProductGet())
        dispatch(getCustomers())
    },[])


    const [productitems, setproductitem] = useState([])
    const [totalAmount, settotalAmount] = useState(0)
    const [purchase,  setpurchase] =useState([{name:'',price:0,quantity:1,productid:'',subtotal:0}])
    
    const products =useSelector((state)=>{
        return state.products
    })

    useEffect(()=>{
        let totalamt=0

        purchase.forEach((item)=>{
            totalamt+=Number(item.subtotal)
        })
        settotalAmount(totalamt)
    },[purchase])
    // useEffect(()=>{
    //     const sub = purchase.map((item)=>{
    //         const subt = item.price*item.quantity
    //         return {...item,subtotal:subt}
    //     })

    //       console.log('subtotal',sub)
    //       setpurchase([...sub])
    // },[purchase.quantity,purchase.price])

    const customers = useSelector((state)=>{
        return state.customers
    })
    //console.log(customers)
    const customermob = customers.map((customer)=>{
        // return {mobile:customer.mobile,id:customer._id}
        return customer.mobile
    })
    //console.log(options)

    const productname = products.map((product)=>{
        return product.name
    })

   const handlepurchase = (e,i)=>{
       const input = e.target.name
       const value = e.target.value
        const res = purchase.map((item,id)=>{
            let subt =  1 * item.price
            if( input =='quantity' ){
                subt= Number(value) * item.price
            }
            if(i == id){
               //console.log(subt)
                return{...item,[input]:value,subtotal:subt}
            }
            else{
                return {...item}
            }
        })
//console.log(res,'res')
        setpurchase(res)

   }

    const customerdetails = (e)=>{
        const customer = customers.find((customer)=>{
            return customer.mobile === mobile
        })
        if(customer)
        setname(customer.name)
        else
        alert('customer not found')
        
    } 
    
    const handleaddproduct = ()=>{
        const res = [...purchase,{name:'',price:0,quantity:1,productid:''}]
        //console.log(res)
        setpurchase(res)
    }

    const handleproductdetails = ()=>{
        //to get the price details
        for(let i=0; i < purchase.length; i++){
           // console.log(purchase[i])
            const result = products.find((item)=>{
                return purchase[i].name == item.name
            })
            if(result){
                setproductitem([...productitems,{...result}])
    //assigning the price and productid and subttotal
                const prodprice = purchase.map((item)=>{
                    const subt = result.price*item.quantity
                    if(result.name == item.name){
                        return {...item,price:result.price,productid:result._id,subtotal:subt}
                    }else{
                        return{...item}
                    }
                })
                setpurchase([...prodprice])
                //console.log(prodprice,'productprice')
            }else{
                alert('product not present')
            }
           
        }
//console.log(productitems,'productitems')
        // for(let i=0; i < productitems.length; i++){
        //     const itemprice = purchase.map((item,index)=>{
        //         if(i === index){
        //             return {...item,price:productitems.price}
        //         }
        //         else{
        //             return{...item}
        //         }
        //     })
       // console.log('item',itemprice)
       // }
    }
   
    return <div>
        <form>
            <h4> Customer details: </h4>
            <input type='text' placeholder='enter the name' value={name} onChange={e => setname(e.target.value)} />
            <Hint options={customermob} >
                <input type='text' placeholder='entr the number' value={mobile} onChange={e => setmobile(e.target.value)} onBlur={customerdetails} />
            </Hint>
        </form>

        
            <h4>Product :</h4>

            {
                purchase.map((item,i )=>{
                    return(
                        <div key={i}>
                            <Hint options={productname} >
                                <input type='text' value={item.name} name='name' onChange={(e)=>handlepurchase(e,i)} onBlur={handleproductdetails} />
                            </Hint>
                            <input type='number' value={item.price} name='price' disabled={true} />
                            <input type='number' value={item.quantity} name='quantity' onChange={(e)=>handlepurchase(e,i)} />
                            <input type='number' disabled={true} value={item.subtotal} />
                            <button onClick={handleaddproduct}>+</button>

                        </div>
                    )
                })
            }

            <input type='number' value={totalAmount}/>
    </div>
}

export default BillsForm