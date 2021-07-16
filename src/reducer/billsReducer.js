const initialStateBills = []

export const billsReducer = (state = initialStateBills, action)=>{
    switch(action.type){
        case 'BILLSLIST': {
            return [...action.payload]
        }

        case 'ADDBILL' : {
            return [...state,{...action.payload}]
        }
        default : {
            return [...state]
        }
    }
}