const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected",()=>{
    console.log("connected..")

})
mongoose.connection.on("error",(error)=>{
    console.log(error)
})
module.exports=mongoose