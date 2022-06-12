const express = require('express')
const mongoose = require("mongoose")
const app = express()

//conectar con la base de dato
const port = process.env.port || 8000
var server_db = "mongodb+srv://magusdisventure:1234@cluster0.e61rqiw.mongodb.net/?retryWrites=true&w=majority"

//rutas 
const useRoutes = require('./src/routes/user')
const rankingRoutes = require('./src/routes/ranking')
app.use(express.json())
app.use('/api',useRoutes)
app.use('/api',rankingRoutes)



app.get('/',(req,res)=>{
    res.send("hola mundo")
})


mongoose
    .connect(server_db)
    .then(()=>console.log("todo bien y yo que me alegro :D"))
    .catch((error)=>console.error(error)
    )

var server = app.listen(port,()=> {
    var host = server.address().address
    var port_ = server.address().port
    console.log("el server esta en http://"+host.toString(),port_)
})
