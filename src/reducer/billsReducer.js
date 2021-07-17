const initialStateBills = []

export const billsReducer = (state = initialStateBills, action)=>{
    switch(action.type){
        case 'BILLSLIST': {
            return [...action.payload]
        }

        case 'ADDBILL' : {
            return [...state,{...action.payload}]
        }

        case 'BILLDELETE' : {
            return state.filter((bill)=>{
                return bill._id != action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}