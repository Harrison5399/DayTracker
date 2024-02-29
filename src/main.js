const express=require("express")
const path = require("path")


// Importing all the routes
// Index
const indexroute=require("./routes/index.js")
const viewroute=require("./routes/view.js")

// Day Activity
const DayActvity_add=require("./routes/DayActivity/add")
const DayActvity_get=require("./routes/DayActivity/get")
const DayActvity_getRange=require("./routes/DayActivity/getRange")
const DayActvity_getChartProperties=require("./routes/DayActivity/getChartProperties")
const DayActvity_editActivity=require("./routes/DayActivity/editActivity")

// Creating express server
const app=express()

app.set('views', path.join(__dirname ,"/templates"))
app.set('view engine', 'pug')

const bodyParser = require('body-parser')
app.use( bodyParser.json() );

app.use(express.static(__dirname + '/modules'))

// Handling routes request `
app.use("/index", indexroute)
app.use("/chart/view", viewroute)

app.use("/DayActivity/add", DayActvity_add)
app.use("/DayActivity/get", DayActvity_get)
app.use("/DayActivity/getRange", DayActvity_getRange)
app.use("/DayActivity/getChartProperties", DayActvity_getChartProperties)
app.use("/DayActivity/editActivity", DayActvity_editActivity)


const PORT = 8080
app.listen(PORT,()=>{

    console.log("SERVER RUNNING ON PORT: " + PORT)
}) 