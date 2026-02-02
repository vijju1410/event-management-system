const jwt = require("jsonwebtoken")
const jwt_secret = "123456"

const Verifytoken= (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        res.status(403).json({message:"token not provided.."})
    }
    try {
        const decode = jwt.verify(token.split(" ")[1],jwt_secret)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({message:"invalid token!"})
    }
}
module.exports = Verifytoken;
