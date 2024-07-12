const UserModel = require('../models/UserModel')

async function allUser(req , res){
    try{
        console.log('user hendel' ,req.userId )
        const alluser = await UserModel.find()
        res.json({
            message : "all user",
            data : alluser,
            success : true,
            error  : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err ,
            error : true,
            suceess : false
         })
    }
}

module.exports = allUser