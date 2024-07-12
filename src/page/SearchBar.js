import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import summaryApi from '../common/index';
import diplayINDcurrency from '../helpers/displaycurrency';
import Context from '../context/index';
import addToCart from '../helpers/addToCart';

const SearchBar = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(location.search).get('q');
  
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${summaryApi.search.url}?q=${query}`);
      const dataResponse = await response.json();
      console.log('dataResponse', dataResponse);
      setData(dataResponse.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProduct();
    }
  }, [query]);

  const { fetchUserAddCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddCart();
  };

  return (
    <div className=' p-4 mx-auto container'>
      {loading && (
        <p className='text-lg text-center'>Loading.....</p>
      )}
      <p className='text-lg font-semibold  my-3'>Search Result: {data.length}</p>
      {data.length === 0 && !loading && (
        <p className='text-lg text-center p-4'>No Data Found...</p>
      )}
         <div className='container   px-1 py-2'>
         <div className=' font-semibold py-2 '>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {data.length > 0 && !loading && (
        data.map((product, index) => (
          <Link 
            key={product?._id || index}
            to={'/product-deatils/'+ product?._id} 
            className='transition bg-white duration-300 ease-in-out w-full min-w-[280px] md:min-w-[360px] max-w-[380px] h-36 flex rounded-md shadow-sm gap-4'
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
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))
      )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default SearchBar;
