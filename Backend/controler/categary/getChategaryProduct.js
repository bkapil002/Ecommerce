const PeoductModel = require('../../models/ProductModel');

const getCategryProduct = async (req, res) => {
    try {
        const distinctCategories = await PeoductModel.distinct("catagory");

        const products = [];

        for (const category of distinctCategories) {
            const productType = await PeoductModel.findOne({ catagory: category });

            if (productType) {
                products.push(productType);
            }
        }

        res.status(200).json({
            data: products,
            message: 'Distinct categories retrieved successfully.',
            error: false,
            success: true
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getCategryProduct;
