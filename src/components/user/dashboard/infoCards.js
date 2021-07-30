import { useSelector } from "react-redux"
import { income } from "../../../helperfunction/dashboardfunction"

const InfoCards = ()=>{
    const {bills, products, customers} = useSelector((state)=>{
        return state
    })
    //console.log(bills, products, customers)
    return<div>
            <div class='row'>
               
               <div class='col-3'>
                   <div class="card text-white bg-success">
                       <div class="card-header text-center" style={{fontSize:'x-large'}}>
                           <strong>CUSTOMERS</strong>
                       </div>
                       <div class="card-body">
                           <h5 class="card-title text-center fs-4"> {customers.length} </h5>
                       </div>
                   </div>
               </div>

               <div class='col-3'>
                   <div class="card text-white bg-success">
                       <div class="card-header text-center" style={{fontSize:'x-large'}}>
                          <strong>PRODUCTS</strong> 
                       </div>
                       <div class="card-body">
                           <h5 class="card-title text-center fs-4"> {products.length} </h5>
                       </div>
                   </div>
               </div>

               <div class='col-3'>
                   <div class="card text-white bg-success">
                       <div class="card-header text-center" style={{fontSize:'x-large'}}>
                          <strong>ORDER</strong> 
                       </div>
                       <div class="card-body">
                           <h5 class="card-title text-center fs-4"> {bills.length} </h5>
                       </div>
                   </div>
               </div>

               <div class='col-3'>
                   <div class="card text-white bg-success">
                       <div class="card-header text-center" style={{ fontSize:'x-large'}}>
                          <strong>CASH FLOW</strong> 
                       </div>
                       <div class="card-body">
                           <h5 class="card-title text-center fs-4"> {income(bills)} </h5>
                       </div>
                   </div>
               </div>
          </div>
    </div>
}

export default InfoCards