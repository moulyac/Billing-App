const loginInitialState = false

const userLogin = (state = loginInitialState, action)=>{
    switch (action.type){
        case 'LOGIN':{
            return action.payload
        }
        default:{
            return state
        }
    }
}

export default userLogin