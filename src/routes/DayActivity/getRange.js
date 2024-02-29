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
    let today = new Date()
    today.setTime(today.getTime()+today.getTimezoneOffset());
    let today_time = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes()
    let today_date = today.toISOString().split('T')[0]

    for (const d of day_range) {
        let day = d.toISOString().split('T')[0]
        let days_data =  JSON.parse(fs.readFileSync(path.join('src/data', day + '.json'), "utf-8"))

        // instead of this, post to editActivity for between curr day and last day edge case
        if (day === today_date) {
            let activity_data = JSON.parse(fs.readFileSync('src/data/activity.json', "utf-8"))

            days_data.push({
                'start': activity_data.start,
                'end': today_time,
                'event': activity_data.event
            })
        }

        data.push(
            {
                [day] : days_data
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