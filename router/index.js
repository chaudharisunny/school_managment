const express =require ('express')
const { addSchool, listSchool }=require ('../controller/school.js')
const router=express.Router()

router.get('/home',async(req,res)=>{
    res.status(200).json({message:'school managment'})
})

router.get('/listSchool',listSchool)
router.post('/addSchool',addSchool)

module.exports= router