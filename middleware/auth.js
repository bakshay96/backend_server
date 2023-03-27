const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async(req,res,next)=>{
    try{
        let token =req?.headers?.authorization;
        // chek token 
        if(!token)
        {
            return res.status(401).json({message:"Not authorised !"});

        }
        token=req.headers.authorization.split(" ")[1];
        //verify token

        const istokenValid = await jwt.verify(token, process.env.JWT_SERECT_KEY);
        if(!istokenValid)
        {
            return res.status(401).json({message:"Not authorised user"});
        }
        req.body.userId=istokenValid.userId;

    }
    catch(err)
    {
        return res.status(500).json({Message:"some problem occured",err:err.message});
    }
    
}

module.exports ={auth}