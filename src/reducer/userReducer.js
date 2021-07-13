const userInitialState = {}

export const userReducer =(state = userInitialState, action)=>{
    switch(action.type){
        case 'ACCOUNT_DETAILS' : {
            return {...action.payload}
        }
        default : {
            return {...state}
        } 
    }
}


