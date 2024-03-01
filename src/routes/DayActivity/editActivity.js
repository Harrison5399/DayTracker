const express=require("express")
const fs = require("fs")
const path = require('path')

const router=express.Router()
/*
    POST STRUCTURE:
    {
        "activity": "label"
    }

    RETURNS:
    {
        "date": {date_data},
        "date": {date_data},
        "date": {date_data}
    }
 */
router.post("/",(req,res,next)=>{

    let req_event = req.body.event

    let activity_data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data', 'activity.json')))
    let active_start = activity_data.start
    let active_event = activity_data.event

    console.log('activity data: ')
    console.log(activity_data)

    // add current activity to days data
    let todays_date = new Date()
    todays_date.setTime(todays_date.getTime()+todays_date.getTimezoneOffset());
    let time = todays_date.getHours().toString().padStart() + ":" + todays_date.getMinutes()
    let date = todays_date.toISOString().split('T')[0]

    // CHANGE DATE HERE \/
    if (fs.existsSync(path.join(__dirname, '../../data', date + '.json'))) {
        console.log('file exists')

        let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data', date + '.json'), "utf-8"))

        data.push({
            'start': active_start,
            'end': time,
            'event': active_event
        })

        // write data to file
        fs.writeFileSync(path.join(__dirname + '../../../data', date + '.json'), JSON.stringify(data), 'utf-8')
    }
    else {
        console.log('doesnt exist')

        let last_date = todays_date
        let last_day = last_date.toISOString().split('T')[0]
        let passed_days = []

        while (!fs.existsSync(path.join(__dirname, '../../data', last_day + '.json')) ) {
            passed_days.push(last_date.toISOString().split('T')[0])
            last_date.setDate(last_date.getDate()-1)
            last_day = last_date.toISOString().split('T')[0]
        }
        console.log(passed_days)

        let last_day_of_data = new Date(passed_days[passed_days.length-1])
        last_day_of_data.setDate(last_day_of_data.getDate()-1)
        last_day_of_data = last_day_of_data.toISOString().split('T')[0]

        while (passed_days.length !== 0) {
            let day_on = passed_days[passed_days.length-1]
            if (passed_days.length === 1) {
                // current day, fill to current time
                console.log('current day: ' + day_on)

                let data = [{
                    'start': '00:00',
                    'end': time,
                    'event': active_event
                }]

                fs.writeFileSync(path.join(__dirname, '../../data', day_on + '.json'), JSON.stringify(data), 'utf-8')

                passed_days.pop()
            }
            else {
                // passed days, fill whole day with post event
                let fill_data = [{
                    'start': '00:00',
                    'end': '24:00',
                    'event': active_event,
                }]

                fs.writeFileSync(path.join(__dirname, '../../data', day_on + '.json'), JSON.stringify(fill_data), 'utf-8')

                passed_days.pop()
            }
        }
        // passed days filled, fill rest of previous day with active event
        console.log('last day of data: ' + last_day_of_data)
        let last_day_data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data', last_day_of_data + '.json'), 'utf-8'))
        last_day_data.push({
            'start': active_start,
            'end': '24:00',
            'event': active_event
        })
        fs.writeFileSync(path.join(__dirname, '../../data', last_day_of_data + '.json'), JSON.stringify(last_day_data), 'utf-8')
    }

    // edit activity.json to new activity
    fs.writeFileSync(path.join(__dirname, '../../data', 'activity.json'), JSON.stringify({
        'start': time,
        'event': req_event
    }), 'utf-8')




    // remove old activity and replace with new one
    res.end()


})

router.get("/", (req, res) => {

    res.render('editActivity.pug')

})

module.exports = router