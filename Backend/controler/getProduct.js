const ProductModel = require('../models/ProductModel')
const getproductControler = async(req , res) =>{
    try{

        const allProduct = await ProductModel.find().sort({createdAt : -1})
        res.json({
            data : allProduct,
            messge : 'All Product',
            sucess : true,
            error  :false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            sucess : false
        })  
     }
}

module.exports = getproductControler