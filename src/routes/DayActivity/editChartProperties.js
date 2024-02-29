const express=require("express")
const fs = require("fs")
const path = require('path')

const router=express.Router()

router.post("/",(req,res,next)=>{

    let req_data = req.body
    console.log('req_data:')
    console.log(req_data)
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data', activitieschartproperties  + '.json'), "utf-8"))
    res.setHeader('Content-Type', 'application/json')
    console.log("\n\n")
    res.json(data)
    res.end()


})

module.exports = router