const express=require("express")
const fs = require("fs")
const path = require('path')

const router=express.Router()

router.post("/",(req,res,next)=>{

    /*
    req JSON:
    {
        "global": {
            "property": "value",
            "property": "value",
            "property": "value"
        }
    }

    OR, sort by only key (global or local) OR what if can have both and see if keys contains either

    {
        "local": {
            "label": {
                "property" : "value",
                "property" : "value",
                "property" : "value"
            }
        }
    }
     */

    let req_data = req.body
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data', activitieschartproperties  + '.json'), "utf-8"))

    if (Object.keys(req_data).includes("global")){
        data.global = {
            ...req_data.global
        }
    }
    if (Object.keys(req_data).includes("local")){
        for (let i in req_data.local) {
            data.local[i] = {
                ...req_data.local[i]
            }
        }
    }

    res.setHeader('Content-Type', 'application/json')
    res.json(data)
    res.end()


})

module.exports = router