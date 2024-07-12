import React,{useState,useEffect, useRef,useContext} from 'react'
import fetchCategoryWisProduct from '../helpers/fetchCategoryWisProduct'
import diplayINDcurrency from '../helpers/displaycurrency'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context  from '../context/index'


const HorizontalCardProduct = ({catagory,header,e}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const loadingList = new Array(13).fill(null); 
   const[scroll , setScroll] = useState(0)
   const scrollEllemant = useRef()
   
   const {fetchUserAddCart } = useContext(Context)
  const handleAddToCart = async(e , id) =>{
    await addToCart(e, id)
    fetchUserAddCart()
  }
   
    const fetchData = async () => {
            setLoading(true);        
            const categoryProduct = await fetchCategoryWisProduct(catagory); 
            setData(categoryProduct?.data); 
            setLoading(false); 
        
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const nextImage=()=>{
      scrollEllemant.current.scrollLeft +=300
    }
 
    const prevImage =()=>{
      scrollEllemant.current.scrollLeft -=300
    }
  return (
    <div className = 'container  mx-auto px-1 py-6 relative'>
    <h2 className='text-2xl font-semibold py-4'>{header}</h2>

      <div className='flex items-center  gap-4 md:gap-6 overflow-scroll scrollbar-none transition duration-300 ease-in-out ' ref={scrollEllemant}>
      <button className='bg-white shadow-md rounded-full p-1 absolute left-0  md:black  ' onClick={prevImage}><FaAngleLeft/></button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0   md:black ' onClick={nextImage}><FaAngleRight/></button>
      {
        loading ?(
                <p className='text-black'>Loading....</p>
        ):(
          data.map((product , index) =>{
            return( 
              <Link 
  to={"product-deatils/"+ product?._id} 
  className='transition bg-white duration-300 ease-in-out w-full min-w-[380px] md:min-w-[360px] max-w-[280px] md:max-w-[380px] h-36 flex rounded-md shadow-sm'
>
  <div className='bg-slate-300 h-full min-w-[120px] rounded-md'>
    <img 
      alt='' 
      src={product.productImage[0]} 
      className='object-scale-down h-full w-full rounded-md' 
    />
  </div>
  <div className='p-4'>
    <h2 className='font-medium md:text-lg text-ellipsis line-clamp-1 text-black'>
      {product?.productName}
    </h2>
    <p className='capitalize text-slate-500'>
      {product?.catagory}
    </p>
    <div className='flex gap-3'>
      <p className='text-red-600 font-medium'>
        {diplayINDcurrency(product?.selling)}
      </p>
      <p className='text-slate-500 line-through'>
        {diplayINDcurrency(product?.price)}
      </p>
    </div>
    <button 
      className='bg-red-600 hover:bg-red-700 text-sm text-white px-2 py-1 rounded-full' 
      onClick={(e)=>handleAddToCart(e,product?._id)}
    >
      Add to Cart
    </button>
  </div>
</Link>
            )
        })
        )
      
      }
      </div>
    </div>
  )
}


export default HorizontalCardProduct
