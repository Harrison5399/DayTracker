// Importing the module
const express=require('express')
const pug = require('pug')
const fs = require('fs')
const path = require('path')

// Creating express Router
const router=express.Router()

// Load template engine (pug)

// Handling login request
router.get('/:range',(req,res,next)=>{

    let range = req.params.range
    // add day range parameter, pass through to dayChart.pug
    res.render('view.pug', {'range':range})

})

module.exports = router


