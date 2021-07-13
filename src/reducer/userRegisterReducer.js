const registerInitialValue = false

const userRegisterReducer = (state = registerInitialValue , action )=>{
    switch(action.type){
        case 'REGISTER':{
            return action.payload
        }
        
        default :{
            return state
        }
    }
}

export default userRegisterReducer