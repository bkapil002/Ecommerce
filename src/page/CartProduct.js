import React, { useState, useEffect, useContext } from 'react';
import summaryApi from '../common/index';
import { toast } from 'react-toastify';
import Context from '../context/index';
import diplayINDcurrency from '../helpers/displaycurrency';
import { MdDelete } from "react-icons/md";

const CartProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingCart = new Array(context.CartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.viewCartProduct.url, {
        method: summaryApi.viewCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuantity = async (id, qty) => {
    try {
      const response = await fetch(summaryApi.UpdateAddCartProduct.url, {
        method: summaryApi.UpdateAddCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        fetchData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating quantity.');
    }
  };

  const increaseQty = (id, qty) => updateQuantity(id, qty + 1);
  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      updateQuantity(id, qty - 1);
    } else {
      toast.error("Quantity can't be less than 1");
    }
  };

  const calculateTotal = () => {
    return data.reduce((total, product) => {
      return total + product.productId.selling * product.quantity;
    }, 0);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(summaryApi.DeleteCartItems.url, {
        method: summaryApi.DeleteCartItems.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.success) {
          toast.success(responseData.message);
          fetchData(); // Refresh data after deletion
        } else {
          toast.error(responseData.message || 'Failed to delete the product.');
        }
      } else {
        toast.error(responseData.message || 'Failed to delete the product.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the product.');
      console.error('Delete product error:', error);
    }
  };

  const totalQty = data.reduce((previseValue , currentValue) => previseValue + currentValue.quantity ,0)

  return (
    <div className="container mx-auto w-full">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product, index) => (
                <div
                  key={product?._id || index}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded flex"
                >
                  <div className="w-28 h-28 p-2">
                    <img
                      src={product?.productId.productImage[0]}
                      alt={product?.productId.productName}
                      className="object-cover h-full w-full rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full p-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="bg-red-100 text-red-600 px-2 rounded-full inline-block w-fit">
                          {product?.productId.brandName}
                        </p>
                        <h2 className="font-medium text-lg">
                          {product?.productId.productName}
                        </h2>
                        <p className="text-sm text-gray-500 capitalize">
                          {product?.productId.catagory}
                        </p>
                        <div className="flex gap-2">
                          <span className="text-gray-500 line-through">
                            {diplayINDcurrency(product?.productId.price)}
                          </span>
                          <span className="text-red-600 font-semibold">
                            {diplayINDcurrency(product?.productId.selling)}
                          </span>
                        </div>
                      </div>
                      <div className="my-6 gap-3 flex items-center">
                        <button
                          onClick={() => deleteProduct(product?._id)}
                          className="hover:text-red-600"
                        >
                          <MdDelete />
                        </button>
                        <button
                          className="p-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 rounded-full"
                          onClick={() => decreaseQty(product?._id, product?.quantity)}
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="p-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full w-8"
                          onClick={() => increaseQty(product?._id, product?.quantity)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="mt-5 lg:mt-0 w-full max-w-sm  ">
         <div className='h-36 bg-white'>
                <h2 className = 'text-white bg-red-600 px-4  '>Summery</h2>
                <div className='flex justify-between items-start px-4 py-1 gap-2 font-medium text-lg text-slate-600  '>
                  <p>Quantity :</p>
                  <p> {totalQty}</p>
                </div>
                <div className='flex justify-between items-start px-4 gap-2 font-medium text-lg text-slate-600 '>
                  <h2 className = "text-red-600 ">Total Price:</h2>
                  <p>{diplayINDcurrency(calculateTotal())}</p>
                </div>
                <button className='bg-blue-600 text-white p-2 cursor-pointer  w-full'>Payment</button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
