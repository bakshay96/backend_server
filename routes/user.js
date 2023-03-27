// user signup login

const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
require("dotenv").config();

const {User} =require("../modles/user");

const {Router}=require("express");
const { profileEnd } = require("console");

const userRouter=Router();


//+register
userRouter.post("/register", async(req,res)=>{
    try{
        const payload= req.body;
        const user= await User.findOne({email:payload.email});
        if(user)
        {
            return res.send({msg:"User already exist, please login"});
        }
        else{
            // encription

            const hashPassword= await bcrypt.hashSync(payload.password,4);
            payload.password=hashPassword;

            const newUser = new User(payload);
            await newUser.save();  // save user

            return res.json({msg:"User registered", user:newUser});
        }
    }
    catch(err)
    {
        res.send({msg:err.message})
    }
});


//login user

userRouter.post("/login", async(req,res)=>{
    try{
        const payload= req.body;
        const user= await User.findOne({email:payload.email});
        if(!user)
        {
            return res.send("Please SignUp first");
        }
        
            //verify user

            const ispasswordCorrect= await bcrypt.compareSync(payload.password, user.password);
            if(ispasswordCorrect)
            {
                // jwt generate
                const token =await  jwt.sign({email:user.email, userId:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:60*60})

                res.json({msg:"Login success", token});

            }
            else{
                res.send({msg:"Invalid credentials"})
            }
    
    }
    catch(err)
    {
        res.send({msg:err.message})
    }
});

module.exports={userRouter};


