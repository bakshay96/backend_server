const {Post} = require("../modles/post");
const {Router} =require("express");
 
const postRouter = Router();

// get post request

postRouter.get("/", async(req,res)=>{
    try{
        const {userId} = req.body;
        const {device =["Laptop", "Tablet", "Mobile"]}=req.query;
        const posts= await Post.find({$and: [{userId}, {device:{$in:device}}]});
        res.json({posts, msg:"Your posts list"})

    }
    catch(err)
    {
        res.send(err.message)
    }
})


//get top comment
postRouter.get("/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const post =await Post.findById(id);
        res.send({post});

    }
    catch(err)
    {
        res.send(err.message)
    }
})

//post request
postRouter.post("/",async(req,res)=>{
    try{
        const data= req.body;
        const newpost= new Post(data);
        await newpost.save();
        res.send({msg:"Post created"});

    }
    catch(err)
    {
        res.send(err.message);
    }
})


//patch request

postRouter.patch("/update/:id",async(req,res)=>{
    try{
        const data= req.body;
        const id = req.params.id;
        const updated = await Post.findByIdUpdate(id,data);
        res.send({msg:"Post updated", post:updated});

    }
    catch(err)
    {
        res.send(err.message);
    }
})
// top 
postRouter.get("/top", async(req,res)=>{
    try{
        const {no_of_comments} = req.body;
       const postData= await Post.find({$max:{no_of_comments}});

       res.status(200).json({"Posts":postData});

    }
    catch(err)
    {
        res.send(err.message)
    }
})


//delete request
postRouter.delete("/delete/:id",async (req,res)=>{
    try{
        const data= req.params.id;
        const deleted = await Post.findByIdAndDelete(id)
        if(deleted)
        {
            res.send({msg:"post deleted",post:deleted});
        }

    }
    catch(err)
    {
        res.send(err.message);
    }
})


module.exports={postRouter};