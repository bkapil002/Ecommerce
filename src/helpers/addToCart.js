import summaryApi from '../common/index';
import { toast } from 'react-toastify';

const addToCart = async (e, id) => {
  // Prevent default event behavior if event object exists
  e?.stopPropagation();
  e?.preventDefault();

  try {
    // Fetch request to add product to cart
    const response = await fetch(summaryApi.getaddcart.url, {
      method: summaryApi.getaddcart.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    // Parse the response data
    const responseData = await response.json();

    // Log the response data
    console.log('cart', responseData);

    // Handle success and error cases
    if (response.ok) {
      if (responseData.success) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message || 'An unexpected error occurred.');
      }
    } else {
      // Handle non-200 responses
      toast.error(responseData.message || 'Failed to add product to cart.');
    }

    // Return the response data
    return responseData;
  } catch (error) {
    // Handle network or other unexpected errors
    toast.error('An error occurred while adding the product to the cart.');
    console.error('Add to cart error:', error);
    return { error: true, message: error.message };
  }
};

export default addToCart;
