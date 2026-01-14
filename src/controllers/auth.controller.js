const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerController(req,res) {
    const {username,password} = req.body
    const isuserExist = await userModel.findOne({
        username
    })
    if(isuserExist) {
        return res.status(400).json({
            message : "username already exist"
        })
    }
    const user = userModel.create({
        username,
        password : await bcrypt.hash(password,10)
    })
    const token = jwt.sign({
        id : user._id
    },process.env.JWT_KEY)
    res.cookie("token",token)   

    res.status(201).json({
        message : "user registered successfully",
        user : {username,
                password
         }
    })

    
}

async function loginController(req,res){
    const {username,password} = req.body
    const isuserExisted = await userModel.findOne({
        username
    })
    if(!isuserExisted) {
        return res.status(401).json({
            message : "user not existed"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,isuserExisted.password);

    if(!isPasswordValid) {
        return res.status(401).json({
            message : "invlaid credential"
        })
    }
    const token = jwt.sign({
        id : isuserExisted._id
    },process.env.JWT_KEY)
    res.cookie("token",token)
    res.status(200).json({
        message : "user logged in successfully",
        isuserExisted : {
            username : isuserExisted.username,
            id : isuserExisted._id
        }
    })

}


module.exports = {registerController,loginController}