const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 8000
var server_db = "mongodb+srv://magusdisventure:1234@cluster0.e61rqiw.mongodb.net/?retryWrites=true&w=majority"

app.get('/',(req,res)=>{
    res.send("hola mundo")
})


mongoose.connect(server_db).then(()=>console.log("todo bien")).catch((error)=>console.error(error))

app.listen(port,()=> console.log('el servidor esta en ',port))