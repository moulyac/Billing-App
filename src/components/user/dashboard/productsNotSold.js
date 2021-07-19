import { useSelector } from "react-redux"
import { least5Product } from "../../../helperfunction/dashboardfunction"

const ProductNotSold = ()=>{
    const {bills, products} = useSelector((state)=>state)
    const notsold = least5Product(bills, products)
    return<div>
        <div class='border'>
            <h4 style={{color:'#dbdb00'}}>Product not sold even once:</h4>
             <hr/>
                <ul class="list-group list-group-flush">
                       {
                          notsold.map((n)=>{
                            return <li class="list-group-item">Name: {n.name} Price: {n.price}</li>
                          }) 
                       }
                </ul>
        </div>
    </div>
}
export default ProductNotSold