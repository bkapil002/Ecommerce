const CartProduct = require('../models/CartProduct')
const countAddToCartProduct = async(req,res) =>{
         try{
            const userId = req.userId
            const count = await CartProduct.countDocuments({
                userId : userId
            })
            console.log(userId)
            res.json({
                data : {
                    count : count 
                },
                message : 'ok',
                error : false,
                success : true
            })
         }catch(err){
            res.status(400).json({
                message: err.message || err,
                error: true,
                success: false
              });
         }
}

module.exports = countAddToCartProduct