const CartProduct = require('../models/CartProduct');

const getAddToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;
    console.log(currentUser)
    const isProductAvailable = await CartProduct.findOne({ productId, userId:currentUser});

    console.log('cart',isProductAvailable)
    if (isProductAvailable) {
      return res.json({
        message: "Product is already in cart",
        error: true,
        success: false
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new CartProduct(payload);
    const saveAddToCart = await newAddToCart.save();

    res.status(200).json({
      data: saveAddToCart,
      error: false,
      success: true,
      message: "Product added to cart successfully"
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = getAddToCart;
