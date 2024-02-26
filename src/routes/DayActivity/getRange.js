const express=require("express")
const fs = require("fs")
const path = require('path')

const router=express.Router()

router.get("/:range",(req,res,next)=>{


    // get day range from url params
    let day_on = new Date(JSON.parse(req.params.range)[0])
    let day_range = [new Date(JSON.parse(req.params.range)[0])]
    let end_date = new Date(JSON.parse(req.params.range)[1])
    while (day_on < end_date) {
        let new_date = new Date(day_on)
        new_date.setDate(day_on.getDate() + 1)
        day_range.push(new_date)
        day_on = new_date
    }

    // get json from each day and push to json obj
    let data = []
    for (const d of day_range) {
        let day = d.toISOString().split('T')[0]
        data.push(
            {
                [day] : JSON.parse(fs.readFileSync(path.join('src/data', day + '.json'), "utf-8"))
            }
        )
    }
    //console.log(day_range)
    res.setHeader('Content-Type', 'application/json')
    //let data =
    res.json(data)
    res.end()


})

module.exports = router