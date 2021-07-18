const filterByDate = []

export const billsPerDay = (bills)=>{
    const dateadded= []

    bills.forEach((bill)=>{
         if(filterByDate.length < 4)
            if(!dateadded.includes(bill.date)){
                dateadded.push(bill.date)
                const res = bills.filter((b)=>{
                    return bill.date === b.date
                })
                filterByDate.push(res)
            }
    })

    const result = [...filterByDate]
    return result.reverse()
}

 export const amountPerDay = ()=>{
    const amountperday = filterByDate.map((arr)=>{
        let totalamt = 0
        arr.forEach((item)=>{
           item.lineItems.forEach((subt)=>{
                totalamt += subt.subTotal 
           })
        })
        return totalamt
    })
    return amountperday.reverse()
}

export const income = (bills)=>{
    let amount = 0

    bills.forEach((bill)=>{
        amount += bill.total
    })

    return amount
}

export const todaySales = (bills)=>{
    const date = new Date().toISOString().split('T')[0]
    const result= bills.filter((bill)=>{
        return bill.date.split('T')[0] == date
    })
    let sales =0
    result.forEach((bill)=>{
        sales += bill.total
    })
    return sales
}

export const salesPercentage = (no, bills)=>{
    const percentage = (no/(bills.length))*100
    //console.log(percentage)
    return Math.round(percentage)
}

export const top5product = (bills, products)=>{
    console.log(bills,products)
    const prods = products
    let psd =[]
    const product =[]

    bills.forEach((bill)=>{
        bill.lineItems.forEach((item)=>{
            prods.forEach((p)=>{
                if(p._id == item.product){
                    if(!product.includes(p._id)){
                        product.push(p._id)
                        const obj ={
                            id:p._id,
                            name:p.name,
                            price:p.price,
                            quantity: item.quantity
                        }
                        psd.push(obj)
                    }
                    else{
                        const res = psd.map((psdp)=>{
                            if(p._id == psdp.id){
                                return {...psdp,quantity:psdp.quantity+item.quantity}
                            }else{
                                return{...psdp}
                            }
                        })
                        psd =[...res]
                    }
                }
            })
        })
    })
    const res = psd.map((p)=>{
        return p.quantity
    })
    
    const sorted = psd.sort ((a,b)=>{
        return (b.quantity - a.quantity)
    })
    const result =[]
    for(let i=0;i<5;i++){
        result.push(sorted[i])
    }
    //console.log(result)
    return result
}