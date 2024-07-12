const ProductModel = require('../../models/ProductModel');

const SearchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query, 'i'); // 'g' flag is not needed for MongoDB queries

        const products = await ProductModel.find({
            "$or": [
                { productName: regex },
                { category: regex } // Ensure 'category' is correctly spelled
            ]
        });

        res.json({
            data: products,
            error: false,
            success: true,
            message: 'ok'
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = SearchProduct;
