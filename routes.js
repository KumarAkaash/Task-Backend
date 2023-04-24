const express = require('express');
const router = express.Router();
const Task = require('./model');


router.post('/v1/tasks', async (req,res)=>{
const {title}=req.body;
const id=Math.random()
const task = new Task({title,id});
    try{        
        await task.save()
         res.status(201).json(task)
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })  
    }
})

router.get('/v1/tasks', async (req,res)=>{
    try{
        const tasks = await Task.find();
        return res.status(200).json({                        
            tasks,        
    })
    }
    catch(e){
        return res.status(422).json({    
            status: "failure",        
            error: e.error
        })
    }
})

router.get('/v1/tasks/:id', async (req, res)=>{
    try{
        const task = await Task.findById({_id: req.params.id});
        return res.status(200).json({                      
            task,        
    })
    }
    catch(e){
        return res.status(404).json({    
            status: "failure",        
            error: "there is no task with that id"
        })
    }
})

router.delete('/v1/tasks/:id', async (req,res)=>{
    try{
         await Task.findByIdAndDelete({_id: req.params.id});
        return res.status(204).json({                  
            message: "Deleted Successfully"     
    })
    }
    catch(e){
        return res.status(204).json({                       
            error: e.error
        })
    }
})

router.put('/v1/tasks/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate({_id: req.params.id}, req.body);
        const updatedData = await Task.findOne({_id: req.params.id})
        return res.status(200).json({                       
            updatedData,        
    })
    }
    catch(e){
        return res.status(404).json({    
            status: "failure",        
            error: e.error
        })        
    }
})


router.post('/v1/tasks/bulk', async (req,res)=>{
    const {tasks}=req.body;
    const bulk=tasks.map((task)=>({
        updateOne:{
            filter:{id:task.id},
            update:{$setOnInsert:task},
            upsert:true,
        }
    }))
        try{        
        const result=await Task.bulkWrite(bulk,{ordered:false})
        res.status(201).json(result)
        }
        catch(e){
            return res.status(422).json({    
                message:e.message
            })  
        }
    })

    router.delete("/v1/tasks",async(req,res)=>{
        try{
            const tasks=req.body;
            const taskid=tasks.map(task=>task.id);
            const result=await Task.deleteMany({id:{$in:taskid}})
            res.status(204).json({message:"task deleted"})
        } catch(e){
            return res.status(422).json({    
                message:e.message
            })  
        }
    })
    
module.exports = router