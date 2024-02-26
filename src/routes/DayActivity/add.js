// Importing the module
const express=require("express")
const fs = require("fs")

// Creating express Router
const router=express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())


/*
    POST STRUCTURE:
    {
        "start": "HH:MM",
        "end": "HH:MM",
        "event": "label"
    }
 */
router.post("/",(req,res,next)=>{

    let data = JSON.parse(fs.readFileSync("data/2024-02-19.json", "utf-8"))
    let body =  req.body
    data.push(body)
    fs.writeFileSync("data/2024-02-19.json", JSON.stringify(data,null,2), "utf-8")

    res.status(200).end()

})

module.exports = router