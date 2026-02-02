require("dotenv").config();

const express = require("express")
const cors= require("cors")
const bodyParser = require("body-parser")
const db = require("./db")

const register=require("./router/registerapi")
const events = require("./router/eventsapi")
const app=express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use("/register",register)
app.use("/event",events)
const port = 5000 || process.env.PORT

app.listen(port,()=>{
    console.log(`connected${port}`)
})