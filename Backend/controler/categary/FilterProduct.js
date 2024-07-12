const ProductModel = require("../../models/ProductModel");

const FilterProduct = async (req, res) => {
  try {
    const categoryList = req?.body?.catagory || [];
    const products = await ProductModel.find({
      catagory: { $in: categoryList },
    });
    console.log('catagery',products);

    res.status(200).json({
      data: products,
      message: 'ok',
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = FilterProduct;
