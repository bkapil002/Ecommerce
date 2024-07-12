import './App.css';
import {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryApi from './common/index'
import context from './context';
import { useDispatch } from 'react-redux';
import { setUserData } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [CartProductCount , setCartProductCount] = useState(0)
  const fetchUserData = async() =>{
            const dataReponse = await fetch(summaryApi.userData.url , {
              method : summaryApi.userData.methods,
              credentials:'include'
            }) 
            const dataApi = await dataReponse.json()

            if(dataApi.success){
              dispatch(setUserData(dataApi.data))
            }
  }
  const fetchUserAddCart = async() =>{
    const dataReponse = await fetch(summaryApi.countAddToCartProduct.url , {
      method : summaryApi.countAddToCartProduct.methods,
      credentials:'include'
    }) 
    const dataApi = await dataReponse.json()

    
    setCartProductCount(dataApi?.data?.count)
}
  useEffect(()=>{
    fetchUserData()
    fetchUserAddCart()
  },[])
  return (
    < >
    <context.Provider value={{fetchUserData , CartProductCount , fetchUserAddCart}}>
      <ToastContainer 
        position='top-center'
      />
      <Header/>
          <main className='min-h-[calc(100vh-120px)] pt-16'>
         <Outlet/>
         </main>
      <Footer/>   
      </context.Provider>
    </>
  );
}

export default App;
