import { useSelector } from "react-redux"
import { amountPerDay, billsPerDay, salesPercentage } from "../../../helperfunction/dashboardfunction"

const StatsOf5Days = ()=>{

    const bills = useSelector((state)=>state.bills)
    console.log('bills',bills)

    const billsperday = billsPerDay(bills)
    const amountperday = amountPerDay(billsperday)
    
console.log(billsperday,amountperday)
    return <div>
        {
            bills.length? 
        
        <div class='border'>
            <h3 class='mb-4' style={{color:'#843CC7'}}> Stats of past 5 days:</h3>
                {
                   billsperday.map((s,i)=>{
                       return <div class='row m-2'>
                           <div class='col-6'>
                               {/* <p>{s[0].date.split('T')[0]}</p> */}
                            <div class="progress" style={{height:'1.3rem'}}>
                                <div class="progress-bar bg-info" role="progressbar" style={{width: `${salesPercentage(s.length, bills)}%`}} aria-valuenow={`${s.length}`} aria-valuemin="0" aria-valuemax="100">{salesPercentage(s.length, bills)}%</div>
                            </div>
                            </div>
                            <div class='col'><strong> Rs.{amountperday[i]} with {s.length} bills</strong></div>
                        </div>                                      
                   })
                }
        </div>:null
}
    </div>
}
export default StatsOf5Days