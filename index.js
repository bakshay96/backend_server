const express =require("express")
const {connection} =require("./config/db");
const { userRouter }= require("./routes/user");
const {postRouter} =require("./routes/post");
const {auth} = require("./middleware/auth");

const cors= require("cors")

const app=express();
require("dotenv").config();
const port=process.env.PORT || 4040;
app.use(express.json());
app.use(cors());


app.use("/users", userRouter);
app.use("/posts",postRouter);
app.use("/posts", auth);

app.listen(port,async ()=>{
    try{
        await connection
        console.log("connected to db on port 8080")
    }
    catch(err)
    {
        console.log(err.messages);
    }
})
