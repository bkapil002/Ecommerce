import React, { useEffect, useState } from 'react';
import summaryApi from '../common/index';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.catagery.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-2 justify-between '>
        {loading ? (
          categoryLoading.map((el, index) => (
            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200' key={'categoryLoading' + index}></div>
          ))
        ) : (
          categoryProduct.map((product, index) => (
            <Link to={'prouct-catgery/' + product?.catagory} key={index} className='cursor-pointer'>
              <div className='w-20 h-20 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center'>
                <img alt='' src={product?.productImage[1]} className='h-full object-full mix-blend-multiply' />
              </div>
              <p className='text-center text-sm md:text-base capitalize'>{product?.catagory}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
