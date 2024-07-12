import React,{useState,useEffect, useRef,useContext} from 'react'
import fetchCategoryWisProduct from '../helpers/fetchCategoryWisProduct'
import diplayINDcurrency from '../helpers/displaycurrency'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context  from '../context/index'




const Recommendedproduct = ({ catagory,header,e}) => {
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
 

  return (
    <div className='container  mx-auto px-1 py-2'>
      <h2 className='text-2xl font-semibold py-4'>{header}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' >
        {
          loading ? (
            <p className='text-black'>Loading....</p>
          ) : (
            data.map((product, index) => {
              return ( 
                <Link 
                  to={"/product-deatils/"+product?._id} 
                  className='transition bg-white duration-300 ease-in-out w-full  min-w-[100px] md:min-w-[250px] md:max-w-[100px] h-auto flex flex-col rounded-md shadow-sm '
                  key={product?._id}
                  onClick={()=>window.scrollTo({top:0 , behavior :'smooth'})}
                >
                  <div className='bg-slate-300  w-auto rounded-md'>
                    <img 
                      alt='' 
                      src={product.productImage[0]} 
                      className='object-scale-down h-full w-full rounded-t-md' 
                    />
                  </div>
                  <div className='p-4 gap-2'>
                  <p className='bg-red-100 text-red-600 px-2 rounded-full inline-block w-fit'>{product?.brandName}</p>
                    <h2 className='font-medium md:text-lg text-ellipsis line-clamp-1 text-black'>
                      {product?.productName}
                    </h2>
                    <p className='capitalize text-slate-500'>
                      {product?.category}
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
              );
            })
          )
        }
      </div>
    </div>
  );
}

export default Recommendedproduct;
