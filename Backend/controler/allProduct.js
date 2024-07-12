const PeoductModel = require('../models/ProductModel')
const uploadindPremissing = require('../helpers/premissing')

async function userUploadeControler(req, res){
   try{

        const sectionUserId = req.userId
        if(!uploadindPremissing(sectionUserId)){
            throw new Error("you are not authorized")
        }

        const UploadProduct = new  PeoductModel(req.body)
        const saveProduct = await UploadProduct.save()
        res.status(200).json({
            message : "product uploade",
            data : saveProduct,
            error : false,
            success : true
        })
   }catch(err){
    res.status(400).json({
        message : err.message || err ,
        error : true,
        success : false
     })
   }
}

module.exports = userUploadeControler