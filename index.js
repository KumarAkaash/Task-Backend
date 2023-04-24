const express =require("express");
const app=express()
const PORT=8085
const mongoose=require('mongoose')

const event =require("./routes")

require("dotenv").config()
mongoose.set('strictQuery',false);
const url=process.env.url
app.use(express.json())
app.use(event)
mongoose.connect(url).then(()=>{
    console.log("connected to db")
}).catch(e=>{
    console.log("error in connection")
})

app.get("/",(req,res)=>{
    res.send("Hello")
})
app.listen(PORT,()=>console.log(`Sun rha hu mai on ${PORT}`));