import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from'./App'

const store = configureStore()

store.subscribe(()=>{
    console.log(store.getState())
})

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
    ,document.getElementById('root'))