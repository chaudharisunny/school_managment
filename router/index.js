const express=require('express')
const { addSchool, listSchool } = require('../controller/school')
const routes=express.Router()

routes.get('/home',async(req,res)=>{
    res.status(200).json({message:'school managment'})
})

routes.get('/listSchool',listSchool)
routes.post('/addSchool',addSchool)

module.exports=routes