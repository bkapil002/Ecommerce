const PeoductModel = require('../../models/ProductModel');

const getChatgeryWishProduct = async (req, res) => {
    try {
      const {catagory} = req?.body || req?.query
      const products = await PeoductModel.find({catagory});
      console.log(products)
        res.status(200).json({
            data: products,
            message: 'Distinct categories retrieved successfully.',
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getChatgeryWishProduct;
