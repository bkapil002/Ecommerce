const CartProduct = require('../../models/CartProduct');

const updateAddCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        // Validate input data
        if (!addToCartProductId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        if (qty == null || isNaN(qty) || qty < 0) {
            return res.status(400).json({
                message: "Valid quantity is required",
                error: true,
                success: false,
            });
        }

        // Find and update the cart product
        const addToCartProduct = await CartProduct.findByIdAndUpdate(
            addToCartProductId,
            { quantity: qty },
            { new: true } // Return the updated document
        );

        if (!addToCartProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            data: addToCartProduct,
            error: false,
            success: true,
            message: "Product Updated",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddCartProduct;
