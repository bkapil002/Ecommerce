const CartProduct = require('../../models/CartProduct')

const getAddCartProduct = async(req , res)=>{
    try{

        const currentUser = req.userId
        const allproduct = await CartProduct.find({
            userId : currentUser
        }).populate('productId')
        res.status(200).json({
            data: allproduct,
            error: false,
            success: true
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getAddCartProduct;