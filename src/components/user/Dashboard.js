import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { amountPerDay, billsPerDay, income, salesPercentage, todaySales, top5product } from "../../helperfunction/dashboardfunction"
import { GoogleCharts } from "google-charts"


const Dashboard = ()=>{
    const [sales, setSales] = useState([])
    const [amtperday, setamtperday] = useState([])

    const {customers, products,bills} = useSelector((state)=>{
        return state
    })

    useEffect(()=>{
        const billsperday = billsPerDay(bills)
        const amountperday = amountPerDay()

        setSales(billsperday)
        setamtperday(amountperday)
        //console.log('res',result)
    },[bills])

    //console.log( customers, products, bills)
    
    //console.log(sales)
    const result = top5product(bills,products)
    const orders = result.map((r)=>{
        console.log(r.name,r.quantity)
        return { [r.name]:r.quantity }
    })

    GoogleCharts.load(drawChart)
     
    const arr = [['number of orders', 'customers count']]
   
    orders.forEach((o)=>{
        console.log(o)
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


    return(
        <div>
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

                <div class='col'>
                <h3 class='m-3'> Stats of past 4 days:</h3>
                {
                   sales.map((s,i)=>{
                       return <div class='row m-2'>
                           <div class='col-3'>
                            <div class="progress" style={{height:'1.3rem'}}>
                                <div class="progress-bar bg-info" role="progressbar" style={{width: `${salesPercentage(s.length, bills)}%`}} aria-valuenow={`${s.length}`} aria-valuemin="0" aria-valuemax="100">{salesPercentage(s.length, bills)}%</div>
                            </div>
                            </div>
                            <div class='col'><strong> Rs.{amtperday[i]} with {s.length} bills</strong></div>
                        </div>                                      
                   })
                }
                </div>

                <div class='col'>
                    <h4>Top 5 products sold</h4>
                    <div id = 'piechart'  
                        style={{width: '400px' , height: '260px', margin:'0px' }} 
                    >
                    </div>
                </div>
           </div>
        </div>      
    )
}

export default Dashboard

const ProductCharts = (bills, products)=>{
    GoogleCharts.load(drawChart)
    const arr = [['number of orders', 'customers count']]
    const orders = top5product(bills, products)
    for(const key in orders){
        arr.push([key, orders[key]])
    }

    function drawChart() {
        const data = GoogleCharts.api.visualization.arrayToDataTable(arr)                  
        const options = {
            backgroundColor:'#FBE0C3'
        }
        const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'))
        chart.draw( data , options);
    }

    return (
            <div id = 'piechart'  
                style={{width: '500px' , height: '400px', marginTop:'0px' }} 
            >
            </div>
    )
}