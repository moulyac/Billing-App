import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers, createStore} from 'redux'
import userRegisterReducer from '../reducer/userRegisterReducer'
import userLoginReducer from '../reducer/userLoginReducer'
import { userReducer } from '../reducer/userReducer'
import customerReducer from '../reducer/customerReducer'
import productReducer from '../reducer/productReducer'
import { billsReducer } from '../reducer/billsReducer'
  
const configureStore =()=>{
    const store = createStore(combineReducers({
       userRegister : userRegisterReducer,
       userLogin : userLoginReducer,
       user : userReducer,
       customers : customerReducer,
       products : productReducer,
       bills : billsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore