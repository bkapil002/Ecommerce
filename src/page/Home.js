import React from 'react'
import Categery from '../component/Categery'
import SlidingProduc from '../component/SlidingProduc'
import HorizontalCardProduct from '../component/HorizontalCardProduct'
import VerticlaCardProduct from '../component/VerticlaCardProduct'
const Home = () => {
  return (
    <div>
    <Categery/>
    <SlidingProduc/>
    
    <HorizontalCardProduct catagory={'earbuds'} header={'Top Airport'}/>
    <VerticlaCardProduct catagory={'watches'} header={'Smart Watch'}/>
    </div>
  )
}

export default Home