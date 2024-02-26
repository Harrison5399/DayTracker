const express=require("express")
const fs = require("fs")
const path = require('path')

const router=express.Router()

router.get("/:date",(req,res,next)=>{

    let data = JSON.parse(fs.readFileSync(path.join('src/data', day + '.json'), "utf-8"))
    res.setHeader('Content-Type', 'application/json')
    //let data =
    res.json(data)
    res.end()


})

module.exports = router