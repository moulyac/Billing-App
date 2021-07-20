export const billsPerDay = (bills)=>{
    const dateadded= []
    const filterByDate = []
    bills.forEach((bill)=>{
       // if(filterByDate.length)
            if(!dateadded.includes(bill.date)){
                dateadded.push(bill.date)
                const res = bills.filter((b)=>{
                    return bill.date === b.date
                })
                filterByDate.push(res)
            }
    })
     
    const result = [...filterByDate]
    return result.reverse().slice(0,5)
}

 export const amountPerDay = (data)=>{
    
    const amountperday = data.map((arr)=>{
        let totalamt = 0
        arr.forEach((item)=>{
            item.lineItems.forEach((subt)=>{
                totalamt += subt.subTotal 
            })
        })
        return totalamt
    })
    return amountperday
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

const productfreq = (bills, products)=>{
    const result = products.map((p)=>{
        let obj = {}
        obj.name = p.name
        obj.price = p.price
        obj.count = 0

        bills.forEach((b)=>{
            const res = b.lineItems.find((item)=>{
                return item.product == p._id
            })
           // console.log(res)
            if(res){
                obj.count += res.quantity
            }
        })
        return obj
    })
//console.log(result)
    return [...result]

}

export const top5product = (bills, products)=>{
    const freq = productfreq(bills,products)
   
    const sorted = freq.sort ((a,b)=>{
        return (b.count - a.count)
    })
    const result =[]
    for(let i=0;i<5;i++){
        result.push(sorted[i])
    }
    
    return result.length ? [...result] : []
}

export const least5Product = (bills, products)=>{
    const result = productfreq(bills,products)
    
    const notsold=result.filter((p)=>{
        return p.count == 0
    })
    //console.log('not',notsold)
   return notsold.length ? notsold : []
}

export const top5customers = (bills, customers)=>{
    const customerfreq = []

    customers.forEach((c)=>{
        const freq = bills.filter((b)=>{
            return c._id == b.customer
        })
        customerfreq.push(freq)
    })

    const sorted = customerfreq.sort ((a,b)=>{
        return (b.length - a.length)
    })

    const result =[]
    for(let i=0;i<5;i++){
        result.push(sorted[i])
    }

    return result 
}

export const customerName = (id,customers)=>{
    const result = customers.find((c)=>{
        return id == c._id
    })
    return result ? {...result} : {}
}