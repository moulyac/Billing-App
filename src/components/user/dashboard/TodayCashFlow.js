import { useSelector } from "react-redux"
import { todaySales } from "../../../helperfunction/dashboardfunction"

const TodayCashFlow = ()=>{
    const bills = useSelector(( state)=>{
        return state.bills
    })

    return<div>
        <h1 class='m-2' style={{color:'#B80062'}}>TODAYS SALES: Rs.{todaySales(bills)}</h1>
    </div>
}
export default TodayCashFlow