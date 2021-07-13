const customersInitialState = []

const customerReducer = (state= customersInitialState, action)=>{
    switch(action.type){
        case 'CUSTOMERS_LIST':{
            return [...action.payload]
        }
        case 'ADDCUSTOMER':{
            return [...state,{...action.payload}]
        }
        case 'DELETE_CUSTOMER':{
            return state.filter((ele)=>{
                return ele._id != action.payload
            })
        }
        case 'EDITCUSTOMER':{
            return state.map((ele)=>{
                if(action.payload._id == ele._id){
                    return {...action.payload}
                }
                else{
                    return{...ele}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default customerReducer
