const UserModel = require('../models/UserModel')
const uploadindPremissing = async(userId) =>{
    const user = await UserModel.findById(userId);

      if(user && user.role === 'ADMIN'){
        return false
      }
      return false
}

module.exports = uploadindPremissing