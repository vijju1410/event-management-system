const express=require("express")
const register= require("../model/register")
const bcrypt= require ("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const jwt_secret="123456"
router.post("/addregister",async (req,res)=>{
    const {name,email,password,role} = req.body
    const hashpassword = await bcrypt.hash(password,6) 
    try {
        const reg= new register({
            name,
            email,
            password:hashpassword,
            role
        })
        const checkemail = await register.findOne({email})
        if(!checkemail){
        const data = await reg.save()
        res.status(201).json({message:"registered successfully..",data})
        }
        else{
                    res.status(201).json({message:"registered already.."})

        }
    } catch (error) {
        console.log("error")
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const log = await register.findOne({email})
        if(!log){
            res.status(201).json({message:"not found"})
        }
    const checkpassword = await bcrypt.compare(password,log.password)
    if(!checkpassword){
        res.status(201).json({message:"wrong password.."})
    } 
        else{

            const token = jwt.sign(
                {userid:log._id,email:log.email},jwt_secret,{expiresIn:"1h"}

            )
            console.log(token)
           res.status(201).json({message:"login successfully..",token,log,role:log.role,success:true}) 


        }

    } catch (error) {
        
    }
})
module.exports=router