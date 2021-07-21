import React, { useState } from 'react'
import StatsOf5Days from './StatsOf5Days'
import InfoCards from './infoCards'
import TodayCashFlow from './TodayCashFlow'
import Top5Products from './Top5Products'
import Top5Customers from './Top5Customers'
import ProductNotSold from './productsNotSold'
import { useSelector } from 'react-redux'

const MainPage = ()=>{

    const {bills,customers, products} = useSelector((state)=>state)

    return<div>
        {
            customers && bills &&  products ?
        
        <div>
            <div>
                <InfoCards/>
            </div>
            <div>
                <TodayCashFlow/>
            </div>
            <div class='row my-3'>
                <div class='col-6'>
                    <StatsOf5Days/>
                </div>
                <div class='col'>
                    <Top5Products/>
                </div>
            </div>
            <div class='row'>
                <div class='col'>
                    <Top5Customers/>
                </div>
                <div class='col'>
                    <ProductNotSold/>
                </div>
            </div>
        </div>: null
}
    </div>
}

export default MainPage