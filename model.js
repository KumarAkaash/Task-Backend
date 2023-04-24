const mongoose=require("mongoose");


const taskSchema=new mongoose.Schema({
    title:{type:String,
    required:true
},
completed:{
    type:Boolean,
    default:false
    
},
id:{
    type:String,
    unique:true
}
})

const taskModel=mongoose.model("Task",taskSchema);
module.exports=taskModel