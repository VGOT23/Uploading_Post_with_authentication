const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log("connected to database")
    })
}


module.exports = connectDB