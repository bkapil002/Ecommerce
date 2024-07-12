import React, { useEffect, useState } from 'react'
import UploadProduct from '../component/UploadProduct'
import summaryApi from '../common/index'
import AdminProduct from '../component/AdminProduct'
 
const AllProduct = () => {
  const [uploadProduct , setUploadProduct] = useState(false)
  const [allProduct , setallProduct] = useState([])

  const fetchAllproduct = async() =>{
   
      const reponse = await fetch(summaryApi.getProduct.url)
      const dataResponse = await reponse.json()
      console.log("product",dataResponse)
      setallProduct(dataResponse?.data || [])
      
  }

  useEffect(()=>{
    fetchAllproduct()
  },[])
  return (
    <div>
      <div className = 'bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className = 'font-bold text-lg'>All Product</h2>
        <button onClick={()=>setUploadProduct(true)} className='border-2 p-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 rounded-full py-1 px3 transition'>Upload Product</button>
      </div>



      <div className='flex items-center flex-wrap h-[cale(100vh-190px)] overflow-y-scroll gap-5 py-4'>
      {
             allProduct.map((product, index) => {
              return(
                <AdminProduct data= {product}  key ={index} fetchdata={fetchAllproduct}/>
              )
             })
     }
</div>

      {
        uploadProduct && (
          <UploadProduct onClose={()=>setUploadProduct(false)} fetchdata={fetchAllproduct} />
        )
      }
      
    </div>
  )
}

export default AllProduct