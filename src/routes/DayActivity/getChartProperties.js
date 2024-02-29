const express=require("express")
const fs = require("fs")
const path = require('path')

const router=express.Router()

router.get("/",(req,res,next)=>{

    let data = JSON.parse(fs.readFileSync('src/data/activitieschartproperties.json', "utf-8"))
    res.setHeader('Content-Type', 'application/json')

    res.json(data)
    res.end()


})

module.exports = router