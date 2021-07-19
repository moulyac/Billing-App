import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { amountPerDay, billsPerDay, customerName, income, least5Product, salesPercentage, todaySales, top5customers, top5product } from "../../helperfunction/dashboardfunction"
import { GoogleCharts } from "google-charts"
import { Button, Modal, CloseButton } from 'react-bootstrap'



const Dashboard = ()=>{
    const [sales, setSales] = useState([])
    const [amtperday, setamtperday] = useState([])
    const [customerbills, setcustomerbills] = useState([])
    const [notsoldproducts, setnotsoldproduct] = useState([])

    const [show, setShow] = useState(false);
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {customers, products,bills} = useSelector((state)=>{
        return state
    })
debugger;
    useEffect(()=>{
        const billsperday = billsPerDay(bills)
        const amountperday = amountPerDay()
        setSales(billsperday)
        setamtperday(amountperday)
        const notsold = least5Product(bills, products)
        setnotsoldproduct(notsold)

    },[bills,customers,products])
debugger;
    const topcustomers = top5customers(bills,customers)
    
    const handlecutomerDetails = (customerbills,custdetails)=>{
        const result = [{...custdetails},[...customerbills]]
        //console.log('handle',result)
        setcustomerbills(result)
    }
    
    return(
        <div>
            {
                customers.length && bills.length &&  products.length ?
            <>
            <div class='row'>
               
                <div class='col-3'>
                    <div class="card text-white bg-success">
                        <div class="card-header text-center" style={{fontFamily:'initial', fontSize:'x-large'}}>
                            <strong>CUSTOMERS</strong>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center fs-4"> {customers.length} </h5>
                        </div>
                    </div>
                </div>

                <div class='col-3'>
                    <div class="card text-white bg-success">
                        <div class="card-header text-center" style={{fontFamily:'initial', fontSize:'x-large'}}>
                           <strong>PRODUCTS</strong> 
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center fs-4"> {products.length} </h5>
                        </div>
                    </div>
                </div>

                <div class='col-3'>
                    <div class="card text-white bg-success">
                        <div class="card-header text-center" style={{fontFamily:'initial', fontSize:'x-large'}}>
                           <strong>ORDER</strong> 
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center fs-4"> {bills.length} </h5>
                        </div>
                    </div>
                </div>

                <div class='col-3'>
                    <div class="card text-white bg-success">
                        <div class="card-header text-center" style={{fontFamily:'initial', fontSize:'x-large'}}>
                           <strong>CASH FLOW</strong> 
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center fs-4"> {income(bills)} </h5>
                        </div>
                    </div>
                </div>
           </div>

           <h1 class='m-2'>TODAYS SALES: Rs.{todaySales(bills)}</h1>
           
           <div class=' row m-3'>

                <div class='col-6 border'>
                <h3 class='m-3' style={{color:'#843CC7'}}> Stats of past 5 days:</h3>
                {
                   sales.map((s,i)=>{
                       return <div class='row m-2'>
                           <div class='col-6'>
                               {/* <p>{s[0].date.split('T')[0]}</p> */}
                            <div class="progress" style={{height:'1.3rem'}}>
                                <div class="progress-bar bg-info" role="progressbar" style={{width: `${salesPercentage(s.length, bills)}%`}} aria-valuenow={`${s.length}`} aria-valuemin="0" aria-valuemax="100">{salesPercentage(s.length, bills)}%</div>
                            </div>
                            </div>
                            <div class='col'><strong> Rs.{amtperday[i]} with {s.length} bills</strong></div>
                        </div>                                      
                   })
                }
                </div>


                <div class='col-1'></div>

                <div class='col'>
                    <ProductCharts />
                </div>
           </div>

           
           <div class='row m-3'>
               <div class='col-6'>
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
                                        <td>{customerName(t[0].customer,customers).name}</td>
                                        <td>{t.length}</td>
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
               <div class='col-1'></div>
               <div class='col-5'>
                   <div class='border'>
                       <h4 style={{color:'#dbdb00'}}>Product not sold even once:</h4>
                       <hr/>
                   <ul class="list-group list-group-flush">
                       {
                          notsoldproducts.map((n)=>{
                            return <li class="list-group-item">Name: {n.name} Price: {n.price}</li>
                          }) 
                       }
                   </ul>
                   </div>
               </div>
           </div>
           </>:null
           }

        </div>      
    )
}

export default Dashboard

const ProductCharts = ()=>{
    const { products, bills } = useSelector((state)=>{
        return state
    })
    
    const [t5product, sett5product] = useState([])
    useEffect(()=>{
        const result = top5product(bills,products)
        sett5product(result)
    },[bills,products])
    //console.log('m',result)

    const orders = t5product.map((r)=>{
       // console.log(r.name,r.quantity)
        return r? { [r.name]:r.count }:{}
    })

    GoogleCharts.load(drawChart)
     
    const arr = [['number of orders', 'customers count']]
   
    orders.forEach((o)=>{
        
        for(const key in o){
            arr.push([key, o[key]])
        }
        
    })
    
   console.log(arr)
    function drawChart() {
        const data = GoogleCharts.api.visualization.arrayToDataTable(arr)                  
        const options = {
            
        }
        const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'))
        chart.draw( data , options);
    }

    return <div>
        <h4 style={{color:'#6D6E97'}}>Top 5 products sold</h4>
        <div id = 'piechart'  
            style={{width: '400px' , height: '260px', margin:'0px' }} 
        >
        </div>
        </div>
}

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