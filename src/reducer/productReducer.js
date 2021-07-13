const initialStateProduct = []

const productReducer = (state= initialStateProduct, action)=>{
    switch(action.type){

        case 'PRODUCTS_LIST':{
            return [...action.payload]
        }

        case 'ADDPRODUCT':{
            return [...state,{...action.payload}]
        }

        case 'DELETEPRODUCT':{
            return state.filter((product)=>{
                return product._id != action.payload._id
            })
        }

        case 'EDITPRODUCT':{
            return state.map((product)=>{
                if(product._id === action.payload._id){
                    return {...action.payload}
                }else{
                    return {...product}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default productReducer