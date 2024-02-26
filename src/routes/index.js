// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

// Handling login request
router.get("/",(req,res,next)=>{
    res.send("Request received")



})

module.exports = router