import React ,{useState,useEffect}from 'react'
import {useParams} from 'react-router-dom'
import summaryApi from '../common/index'
import { IoStar , IoStarHalf } from "react-icons/io5";
import diplayINDcurrency from '../helpers/displaycurrency'
import Recommendedproduct from '../component/Recommendedproduct'



const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    productImage: [],
    description: '',
    catagory: '',
    price: '',
    selling: '',
  });
  const[loading ,setLoading] =useState(true)
  const [activeImage , setActiveImage] = useState('')
  const params = useParams()
  const productImageLoading = new Array(4).fill(null)
  console.log(params)
  const fatchProductDtails = async() =>{
    setLoading(true)
       const response  = await fetch(summaryApi.productDetails.url ,{
        method : summaryApi.productDetails.method ,
        headers : {
                "Content-Type":"application/json"
        },
        body : JSON.stringify({
          productId : params?.id
        })
       })
       setLoading(false)
       const dataResponse = await response.json()
       setData(dataResponse?.data)
       setActiveImage(dataResponse?.data.productImage[0])
  }
  useEffect(()=>{
    fatchProductDtails()
  },[params])
  const headerMousePointer = (imageURL)=>{
    setActiveImage(imageURL) 
  }

  return (
    <div className= 'container mx-auto p-4'>
    <div className='min-h-[200px] flex flex-col lg:flex-row gap-2'>
      <div className='h-96 gap-2 '>
       
        <div className="w-full  overflow-hidden h-96">
          {
            loading ? (
              <div className='gap-2 flex  lg:flex-col scrollbar-none overflow-hidden h-full'>
                {
                  productImageLoading.map((el, index) => (
                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}></div>
                  ))
                }
              </div>
            ) : (
              <div className='gap-2 flex lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                  data?.productImage?.map((imageURL, index) => (
                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                      <img src={imageURL} alt='' className='h-full w-full object-scale-down mix-blend-multiply rounded cursor-pointer' onMouseEnter={()=>headerMousePointer(imageURL)} />
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
      <div className='h-[300px] w-[600px] lg:h-96 lg:w-[450px] '>
          <img alt='' src={activeImage} className='w-full   h-full object-scale-down' />
        </div>


      {

        loading ? (
          <div className=' grid gap-1 w-full' >
        <p className='bg-slate-200 animate-pulse h-4 w-full rounded-full inline-block '></p>
        <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full' ></h2>
        <p className=' text-slate-400 capitalize bg-slate-200 min-w-[100px] animate-pulse h-6'></p>

        <div className= 'flex text-red-600 bg-slate-200 h-6 animate-pulse  items-center gap-1 w-full'>

        </div>

        <div className='flex items-center gap-2 lg:text-2xl text-2xl font-medium my-1 animate-pulse h-6  w-full '>
          <p className='text-slate-400 line-through bg-slate-200  w-full'></p>
          <p className='text-red-600 bg-slate-200  w-full'></p>
        </div>
        <div className='flex items-center gap-3 my-2'>
          <button className='h-6 bg-slate-200  w-full'></button>
          <button className='bg-slate-200 h-6  w-full'>t</button>
        </div>
        <div>
          <p className='text-slate-200 h-2'></p>
          <p className=''></p>
        </div>
      </div>
        ):(
          <div className='flex gap-1 flex-col mx-2' >
        <p className='bg-red-100 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
        <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
        <p className=' text-slate-400 capitalize'>{data?.catagory}</p>

        <div className= 'flex text-red-600 items-center gap-1'>
        <IoStar />
        <IoStar />
        <IoStar />
        <IoStar />
        <IoStarHalf />
        </div>

        <div className='flex items-center gap-2 lg:text-2xl text-2xl font-medium my-1'>
          <p className='text-slate-400 line-through'>{diplayINDcurrency(data.price)}</p>
          <p className='text-red-600'>{diplayINDcurrency(data.selling)}</p>
        </div>
        <div className='flex items-center gap-3 my-2'>
          <button className='border-2 rounded border-red-600  px-3 py-1 min-w-[100px] font-medium hover:bg-red-600 hover:text-white'>Buy</button>
          <button className='border-2 rounded border-red-600 px-3 py-1 min-w-[100px] font-medium hover:bg-red-600 hover:text-white'>Add To Cart</button>
        </div>
        <div>
          <p className='text-slate-500 font-medium my-1'>Description :</p>
          <p className=''>{data?.description}</p>
        </div>
      </div>
        )
      }
    </div>
    {
      data.catagory && (
        <Recommendedproduct catagory={data?.catagory} header={'Recommended Product'}/>
      )
          }
    
  </div>
  )
}

export default ProductDetails
