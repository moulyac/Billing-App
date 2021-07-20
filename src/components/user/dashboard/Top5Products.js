import { useSelector } from "react-redux"
import { GoogleCharts } from "google-charts"
import { top5product } from "../../../helperfunction/dashboardfunction"

const Top5Products = ()=>{

    const { products, bills } = useSelector((state)=>{
        return state
    })
     
    const result = top5product(bills,products)
    //console.log('m',result)
    const orders = result.map((r)=>{
        return r? { [r.name]:r.count }:{}
    })

    GoogleCharts.load(drawChart)
     
    const arr = [['number of orders', 'customers count']]
   
    orders.forEach((o)=>{
        for(const key in o){
            arr.push([key, o[key]])
        }
    })
  
    function drawChart() {
        const data = GoogleCharts.api.visualization.arrayToDataTable(arr)                  
        const options = { }
        const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'))
        chart.draw( data , options);
    }

    return <div class='border'>
            <h4 style={{color:'#6D6E97'}}>Top 5 products sold</h4>
            <div id = 'piechart'  
                style={{width: '400px' , height: '260px', margin:'0px' }} 
            >
            </div>
        </div>
}

export default Top5Products