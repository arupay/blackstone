//Dependencies
const express = require("express");
const cors = require("cors")

//Config
const app = express();


//Routes
app.get("/", (req, res)=>{
    res.send("Welcome to RoomBooker")
})

app.get("*", (req,res)=>{
    res.send("Sorry, this route does not exist")
})

module.exports=app;