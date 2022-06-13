const express =require('express')
const userSchema = require('../models/user')
const router = express.Router()


//guardar datos
router.post('/users',(req,res)=>{
    const user = userSchema(req.body)
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}))
})

//traer todos los datos
router.get('/users',(req,res)=>{
    /*
    console.log("comienzo")
    console.log(req)
    console.log("final")
    */
    userSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}))
})


// traer dato por id
router.get('/users/:id',(req,res)=>{
    const{id}= req.params
    userSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}))
})

//actualisar datos de un usuario
router.put('/users/:id',(req,res)=>{
    const{id}= req.params
    const{name,nickname,email,password} = req.body
    userSchema
        .updateOne(
            {_id:id},
            { $set: { name,nickname,email,password}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}))
})

//delete datos por id
router.delete('/users/:id',(req,res)=>{
    const{id}= req.params

    userSchema
        .remove({_id:id})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}))
})


module.exports = router