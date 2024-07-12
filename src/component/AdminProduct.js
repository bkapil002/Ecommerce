import React,{useState} from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import AdminEditProduct from '../component/AdminEditProduct'
import diplayINDcurrency from '../helpers/displaycurrency'


const AdminProduct = ({data , fetchdata}) => {
    const[editProduct ,setEditProduct] = useState(false)
  return (
    <div>
      <div className='bg-white p-4 rounded'>
      <div className='w-40'>
      <div className='w-32 h-23 flex justify-center items-center'>
      <img src={data?.productImage[0]} alt='' className='mx-auto object-fill h-full'/>

      </div>
        <h2 className='text-ellipsis line-clamp-2'>{data.productName}</h2>

           <div>
               
               <p className='font-semibold'>
                {
                  diplayINDcurrency(data.selling)
                }
               </p>

           <div className ='w-fit ml-auto cursor-pointer p-2  rounded-full hover:bg-red-600 bg-red-200 hover:text-white' onClick={()=>setEditProduct(true)} >
        <RiEdit2Fill/>
        </div>
           </div>

        
      </div>
      </div>
      {
        editProduct && (
          <AdminEditProduct deltails={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
        )
      }
    </div>
  )
}

export default AdminProduct
