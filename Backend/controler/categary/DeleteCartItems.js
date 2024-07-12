const CartProduct = require('../../models/CartProduct');

const deleteCartItems = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const cartId = req.body._id;

        if (!cartId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        // Find and delete the product from the cart
        const deleteResult = await CartProduct.findByIdAndDelete(cartId);

        if (!deleteResult) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            data: deleteResult,
            error: false,
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = deleteCartItems;
