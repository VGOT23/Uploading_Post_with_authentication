// as in the instagram we have a lot of APIs which are procted means that if the user is logged in then only he can 
// do further requests . 
// As it is not possible to write the same code again and again so we have make use of the middle ware 
// So as of this project we are making in that we are sure about we have to check for the two things for every protected api we are creating
// The two things which are -> if token is there and second one if token is valid or not 
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
async function authMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message : "Unauthorised access"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_KEY)
        const user = await userModel.findOne({
            _id : decode.id
        })
        req.user = user
        next()
    }catch(err){
        return res.status(401).json({
            message : "Invalid Token try again Login "
        })
    }

}

module.exports = authMiddleware